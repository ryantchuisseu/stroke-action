"""
Bande-son originale de « Santa & Co. » — 100 % synthétisée (numpy), calée à l'image.
120 BPM : 1 temps = 15 frames à 30 fps.
Usage : python3 scripts/soundtrack.py  ->  public/audio/soundtrack.wav
"""
import os
import wave

import numpy as np

SR = 48000
FPS = 30
TOTAL_FRAMES = 1410
DUR = TOTAL_FRAMES / FPS
N = int(DUR * SR) + SR  # marge de queue, coupée à la fin
BEAT = 0.5
L = np.zeros(N)
R = np.zeros(N)
rng = np.random.default_rng(7)

# début de chaque scène (frames absolues, transitions de 15 frames incluses)
S = {"intro": 0, "factory": 105, "takeoff": 300, "city": 435, "chimney": 750, "kpi": 1035, "outro": 1230}
fr = lambda f: f / FPS  # noqa: E731


def note(n):
    """nom -> fréquence (A4 = 440)"""
    names = {"C": -9, "C#": -8, "Db": -8, "D": -7, "D#": -6, "Eb": -6, "E": -5, "F": -4, "F#": -3, "Gb": -3,
             "G": -2, "G#": -1, "Ab": -1, "A": 0, "A#": 1, "Bb": 1, "B": 2}
    pitch, octv = n[:-1], int(n[-1])
    return 440.0 * 2 ** ((names[pitch] + (octv - 4) * 12) / 12)


def add(sig, t0, gain=1.0, pan=0.0):
    i = int(t0 * SR)
    if i >= N or i + len(sig) <= 0:
        return
    if i < 0:
        sig = sig[-i:]
        i = 0
    sig = sig[: N - i]
    gl = gain * np.sqrt((1 - pan) / 2)
    gr = gain * np.sqrt((1 + pan) / 2)
    L[i: i + len(sig)] += sig * gl
    R[i: i + len(sig)] += sig * gr


def tt(d):
    return np.arange(int(d * SR)) / SR


def lowpass(x, a):
    y = np.empty_like(x)
    acc = 0.0
    for k in range(len(x)):  # boucle simple, signaux courts
        acc += a * (x[k] - acc)
        y[k] = acc
    return y


# ---------------- instruments ----------------
def bell(f, d=2.2, bright=2.5):
    t = tt(d)
    env = np.exp(-t * 2.6)
    mod = bright * np.exp(-t * 4) * np.sin(2 * np.pi * f * 3.5 * t)
    return np.sin(2 * np.pi * f * t + mod) * env * np.minimum(1, t * 400)


def celesta(f, d=1.0):
    t = tt(d)
    env = np.exp(-t * 5)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t * 12)
    return s * env * np.minimum(1, t * 600)


def pluck(f, d=0.5):
    t = tt(d)
    env = np.exp(-t * 9)
    s = np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 18) + 0.2 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 25)
    return s * env * np.minimum(1, t * 800)


def bass(f, d=0.45):
    t = tt(d)
    env = np.exp(-t * 3.5) * np.minimum(1, t * 300)
    s = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)
    return np.tanh(1.6 * s) * env


def pad(freqs, d):
    t = tt(d)
    s = np.zeros_like(t)
    for f in freqs:
        for det in (-0.12, 0.0, 0.13):
            ff = f * 2 ** (det / 12)
            s += 2 * ((ff * t + rng.random()) % 1) - 1  # dent de scie
    s /= len(freqs) * 3
    s = lowpass(s, 0.04)
    a = min(0.6, d / 3)
    env = np.minimum(1, t / a) * np.minimum(1, (d - t) / a)
    return s * env


def kick():
    t = tt(0.35)
    f = 45 + 90 * np.exp(-t * 30)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 9)


def jingle(d=0.12):
    """grelots de traîneau : bruit aigu + petites cloches"""
    t = tt(d)
    n = rng.standard_normal(len(t))
    n = n - lowpass(n, 0.35)
    s = n * 0.5
    for f in rng.uniform(5200, 9200, 4):
        s += 0.35 * np.sin(2 * np.pi * f * t + rng.random() * 6)
    return s * np.exp(-t * 38)


def snap():
    t = tt(0.18)
    n = rng.standard_normal(len(t))
    n = n - lowpass(n, 0.2)
    return n * np.exp(-t * 28)


def whoosh(d=1.0, up=True):
    t = tt(d)
    n = rng.standard_normal(len(t))
    cut = np.linspace(0.02, 0.35, len(t)) if up else np.linspace(0.35, 0.02, len(t))
    y = np.empty_like(n)
    acc = 0.0
    for k in range(len(n)):
        acc += cut[k] * (n[k] - acc)
        y[k] = acc
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    return y * env


def pop_sfx():
    t = tt(0.16)
    f = 500 + 900 * (1 - np.exp(-t * 40))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 26)


def tick():
    t = tt(0.25)
    return np.sin(2 * np.pi * 1760 * t) * np.exp(-t * 18)


def thud():
    t = tt(0.4)
    f = 40 + 60 * np.exp(-t * 20)
    n = lowpass(rng.standard_normal(len(t)), 0.05)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) + 2 * n) * np.exp(-t * 10)


# ---------------- harmonie ----------------
PROG = [  # 1 accord = 1 mesure (2 s)
    ("C", ["C3", "E3", "G3", "C4"], ["C5", "E5", "G5", "E5", "C6", "G5", "E5", "G5"]),
    ("E", ["E3", "G#3", "B3", "D4"], ["B4", "E5", "G#5", "B5", "D6", "B5", "G#5", "E5"]),
    ("A", ["A2", "C3", "E3", "A3"], ["A4", "C5", "E5", "A5", "C6", "A5", "E5", "C5"]),
    ("F", ["F2", "A2", "C3", "F3"], ["F4", "A4", "C5", "F5", "A5", "F5", "C5", "A4"]),
    ("C", ["C3", "E3", "G3", "C4"], ["G4", "C5", "E5", "G5", "C6", "G5", "E5", "C5"]),
    ("A", ["A2", "C3", "E3", "A3"], ["A4", "C5", "E5", "A5", "E5", "C5", "A4", "E5"]),
    ("D", ["D3", "F3", "A3", "C4"], ["D5", "F5", "A5", "C6", "A5", "F5", "D5", "F5"]),
    ("G", ["G2", "B2", "D3", "F3"], ["G4", "B4", "D5", "F5", "G5", "F5", "D5", "B4"]),
]
BASS = {"C": "C2", "E": "E2", "A": "A1", "F": "F2", "D": "D2", "G": "G1"}
MELODY = [  # motif original aux cloches, 1 note / temps (None = silence)
    ["E5", None, "G5", "E5"], ["D5", None, "B4", None], ["C5", "E5", "A5", None], ["A5", "G5", "F5", None],
    ["E5", None, "G5", "C6"], ["C6", "B5", "A5", None], ["F5", "A5", "C6", "A5"], ["G5", None, "F5", "D5"],
]


def section_level(t):
    """énergie de la musique selon la scène"""
    f = t * FPS
    if f < S["factory"]:
        return 0  # intro
    if f < S["chimney"]:
        return 2
    if f < S["kpi"] - 10:
        return 1  # scène intimiste
    if f < S["outro"]:
        return 2
    return 3  # outro


bar_t = 0.0
bar = 0
while bar_t < DUR - 0.5:
    name, chord, arp = PROG[bar % len(PROG)]
    lvl = section_level(bar_t + 0.01)
    if lvl < 3:
        add(pad([note(n) for n in chord], 2.3), bar_t, 0.16 if lvl else 0.22, 0.0)
    for k in range(8):  # arpèges céleste en croches
        t0 = bar_t + k * BEAT / 2
        if t0 >= DUR or section_level(t0) == 3:
            continue
        g = 0.07 if section_level(t0) == 0 else 0.09
        add(celesta(note(arp[k])), t0, g, -0.4 if k % 2 else 0.4)
    for b in range(4):
        t0 = bar_t + b * BEAT
        if t0 >= DUR:
            continue
        l2 = section_level(t0)
        if l2 >= 2 and l2 != 3:
            add(kick(), t0, 0.55)
            add(bass(note(BASS[name])), t0, 0.32)
            add(bass(note(BASS[name]) * 2), t0 + BEAT / 2, 0.12)
            if b % 2 == 1:
                add(snap(), t0, 0.16, 0.1)
            for h in range(2):
                add(jingle(), t0 + h * BEAT / 2 + 0.01, 0.14 if h else 0.09, 0.5)
            m = MELODY[bar % len(MELODY)][b]
            if m:
                add(bell(note(m), 1.6), t0, 0.12, -0.2)
        elif l2 == 1:
            add(bass(note(BASS[name]), 0.9), t0, 0.18) if b == 0 else None
            add(pluck(note(arp[b * 2])), t0 + BEAT / 2, 0.08, 0.3)
    bar_t += 4 * BEAT
    bar += 1

# ---------------- SFX calés sur l'image ----------------
# Intro : chute du cadeau, ouverture magique
add(thud(), fr(18), 0.45)
add(whoosh(1.2, up=True), fr(20), 0.18)
for k, n in enumerate(["C6", "E6", "G6", "C7", "E7"]):
    add(bell(note(n), 2.0, 1.5), fr(44) + k * 0.06, 0.09, -0.5 + k * 0.25)
add(bell(note("C5"), 3.0), fr(50), 0.15)

# Usine : tampon VÉRIFIÉ
add(thud(), fr(S["factory"] + 156), 0.35)
add(bell(note("G6"), 0.8), fr(S["factory"] + 156), 0.08)

# Décollage : compte à rebours + whoosh
for k in range(3):
    add(tick(), fr(S["takeoff"] + 4 + k * 10), 0.18)
add(bell(note("C6"), 1.2), fr(S["takeoff"] + 34), 0.12)
add(whoosh(2.4, up=True), fr(S["takeoff"] + 34), 0.32)
add(whoosh(0.9, up=False), fr(S["city"] - 8), 0.22)

# Ville : un « ding » par cheminée livrée
TOTAL_LEN = 45
for i, s in enumerate([6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39]):
    fh = 8 + s / TOTAL_LEN * 242
    add(pop_sfx(), fr(S["city"] + fh + 10), 0.1)
    add(bell(note(["E6", "G6", "C7", "A6"][i % 4]), 1.0, 1.2), fr(S["city"] + fh + 12), 0.08, (i % 3 - 1) * 0.5)
# Ville : finale (des millions de lumières)
add(whoosh(2.2, up=True), fr(S["city"] + 240), 0.22)
for k in range(24):
    t0 = fr(S["city"] + 262) + k * 0.07
    add(celesta(note(["C6", "E6", "G6", "C7", "E7", "G7"][k % 6]), 0.8), t0, 0.05 + k * 0.002, rng.uniform(-0.8, 0.8))

# Cheminée : glissade, atterrissage, cadeaux, sapin, départ
add(whoosh(1.0, up=False), fr(S["chimney"] + 70), 0.25)
add(thud(), fr(S["chimney"] + 98), 0.5)
for k in range(4):
    add(pop_sfx(), fr(S["chimney"] + 164 + k * 8), 0.16, -0.3 + k * 0.2)
for k in range(10):
    add(celesta(note(["C6", "D6", "E6", "G6", "A6", "C7", "D7", "E7", "G7", "C8"][k]), 0.9), fr(S["chimney"] + 194) + k * 0.08, 0.08)
add(bell(note("C6"), 3.0), fr(S["chimney"] + 220), 0.14)
add(whoosh(0.6, up=True), fr(S["chimney"] + 232), 0.28)

# KPI : chaque barre qui monte
for k in range(4):
    add(pop_sfx(), fr(S["kpi"] + 14 + k * 12), 0.13)
    add(bell(note(["C5", "E5", "G5", "C6"][k]), 1.2), fr(S["kpi"] + 16 + k * 12), 0.08)

# Outro : passage du traîneau + citation « Vive le vent » (domaine public) + accord final
add(whoosh(2.4, up=False), fr(S["outro"]), 0.2)
t0 = fr(S["outro"] + 48)
ph = [("E5", 1), ("E5", 1), ("E5", 2), ("E5", 1), ("E5", 1), ("E5", 2), ("E5", 1), ("G5", 1), ("C5", 1.5), ("D5", 0.5), ("E5", 4)]
for n, d in ph:
    add(bell(note(n), 2.0, 2.0), t0, 0.16, -0.15)
    add(jingle(0.2), t0, 0.08, 0.5)
    t0 += d * 0.25
add(pad([note(n) for n in ["C3", "E3", "G3", "C4", "E4"]], DUR - fr(S["outro"] + 40) + 0.5), fr(S["outro"] + 40), 0.2)
add(bell(note("C4"), 4.0, 1.0), fr(S["outro"] + 40), 0.2)
add(bell(note("C6"), 4.0, 1.0), fr(S["outro"] + 40), 0.08)

# ---------------- mix ----------------
n_out = int(DUR * SR)
L, R = L[:n_out], R[:n_out]
# micro-réverb (échos décorrélés)
for d, g in [(0.031, 0.25), (0.047, 0.2), (0.071, 0.15), (0.113, 0.1)]:
    k = int(d * SR)
    L[k:] += g * R[:-k]
    R[k:] += g * L[:-k]
mix = np.stack([L, R], axis=1)
mix /= np.max(np.abs(mix)) + 1e-9
mix = np.tanh(mix * 1.4) / np.tanh(1.4) * 0.89
# fondus
fi = int(0.05 * SR)
fo = int(0.8 * SR)
mix[:fi] *= np.linspace(0, 1, fi)[:, None]
mix[-fo:] *= np.linspace(1, 0, fo)[:, None]

os.makedirs("public/audio", exist_ok=True)
with wave.open("public/audio/soundtrack.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print(f"OK : {DUR:.2f} s")
