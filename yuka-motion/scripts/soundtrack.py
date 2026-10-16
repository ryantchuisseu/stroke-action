"""
Bande-son originale de la pub Yuka — 100 % synthétisée (numpy), calée à l'image.
120 BPM : 1 temps = 15 frames à 30 fps.
Usage : python3 scripts/soundtrack.py  ->  public/audio/soundtrack.wav
"""
import os
import wave

import numpy as np

SR = 48000
FPS = 30
TOTAL_FRAMES = 750
DUR = TOTAL_FRAMES / FPS
N = int(DUR * SR) + SR
BEAT = 0.5
L = np.zeros(N)
R = np.zeros(N)
rng = np.random.default_rng(11)
fr = lambda f: f / FPS  # noqa: E731

# repères de la timeline (doivent suivre src/anim.ts)
T = dict(hook=0, phoneIn=84, scan1=112, food=166, cosmetic=330, alt=455, proof=566, outro=660, end=750)


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



def beep(f=1800, d=0.12):
    t = tt(d)
    return np.sin(2 * np.pi * f * t) * np.minimum(1, (d - t) * 60) * np.minimum(1, t * 500)


def clap():
    t = tt(0.2)
    n = rng.standard_normal(len(t))
    n = n - lowpass(n, 0.25)
    env = np.exp(-t * 30) + 0.6 * np.exp(-np.maximum(0, t - 0.012) * 30) * (t > 0.012)
    return n * env


def hat():
    t = tt(0.06)
    n = rng.standard_normal(len(t))
    n = n - lowpass(n, 0.5)
    return n * np.exp(-t * 70)


# ---------------- musique ----------------
PROG = [  # Do – Sol – Lam – Fa (pop lumineuse)
    ("C", ["C3", "E3", "G3", "C4"], ["C5", "E5", "G5", "E5", "C6", "G5", "E5", "G5"], "C2"),
    ("G", ["G2", "B2", "D3", "G3"], ["B4", "D5", "G5", "D5", "B5", "G5", "D5", "G5"], "G1"),
    ("A", ["A2", "C3", "E3", "A3"], ["C5", "E5", "A5", "E5", "C6", "A5", "E5", "A5"], "A1"),
    ("F", ["F2", "A2", "C3", "F3"], ["A4", "C5", "F5", "C5", "A5", "F5", "C5", "F5"], "F1"),
]
groove0 = fr(T["phoneIn"])
bar_t, bar = 0.0, 0
while bar_t < DUR - 0.3:
    name, chord, arp, bn = PROG[bar % 4]
    if bar_t < groove0:
        # accroche : nappe en suspension + tic-tac
        add(pad([note(n) for n in chord], 2.2), bar_t, 0.18)
        for b in range(4):
            add(tick(), bar_t + b * BEAT, 0.07, 0.3 if b % 2 else -0.3)
    else:
        outro = bar_t >= fr(T["outro"]) - 0.1
        add(pad([note(n) for n in chord], 2.2), bar_t, 0.12)
        for k in range(8):
            t0 = bar_t + k * BEAT / 2
            add(pluck(note(arp[k]), 0.4), t0, 0.12, -0.35 if k % 2 else 0.35)
        for b in range(4):
            t0 = bar_t + b * BEAT
            add(kick(), t0, 0.5)
            add(bass(note(bn)), t0, 0.3)
            add(bass(note(bn) * 2, 0.25), t0 + BEAT / 2, 0.1)
            if b % 2:
                add(clap(), t0, 0.2, 0.1)
            add(hat(), t0 + BEAT / 2, 0.07, 0.5)
            add(hat(), t0 + BEAT / 4 * 3, 0.04, 0.5)
        if outro:
            add(bell(note(chord[-1]) * 2, 2.5, 1.5), bar_t, 0.1)
    bar_t += 4 * BEAT
    bar += 1

# ---------------- bruitages calés à l'image ----------------
# rayon : chaque produit qui apparaît
for i in range(15):
    add(pop_sfx(), fr(6 + i * 2.5), 0.05, (i % 5 - 2) * 0.3)
add(whoosh(1.0, up=True), fr(T["phoneIn"] - 26), 0.25)  # zoom + révélation verte
add(whoosh(0.7, up=False), fr(T["phoneIn"]), 0.2)  # arrivée du téléphone
# scans : bip de détection
for det in (T["scan1"] + 32, T["cosmetic"] + 34):
    add(beep(1760), fr(det), 0.22)
    add(beep(2350, 0.16), fr(det) + 0.11, 0.18)
# fiches produits qui montent + lignes qui s'affichent
for st in (T["food"], T["cosmetic"] + 40):
    add(whoosh(0.4, up=True), fr(st) - 0.05, 0.15)
    for k in range(6):
        add(tick(), fr(st + 18 + k * 4), 0.05, 0.2)
# mises en avant (additifs, BHT) + bulles
for f0 in (T["food"] + 52, T["cosmetic"] + 72):
    add(pop_sfx(), fr(f0), 0.16)
for f0 in (T["food"] + 56, T["food"] + 100, T["cosmetic"] + 76):
    add(pop_sfx(), fr(f0), 0.12, 0.3)
# alternatives : cartes + validation
add(whoosh(0.5, up=False), fr(T["alt"]), 0.16)
for k, n in enumerate(["C6", "E6", "G6", "C7"]):
    add(bell(note(n), 1.2, 1.2), fr(T["alt"] + 30 + k * 6), 0.07, -0.3 + k * 0.2)
add(bell(note("G6"), 1.6, 1.5), fr(T["alt"] + 62), 0.12)
# 80 millions : compteur
for k in range(12):
    add(tick(), fr(T["proof"] + 6 + k * 3), 0.05)
for k in range(3):
    add(pop_sfx(), fr(T["proof"] + 32 + k * 8), 0.1)
# fin : logo
add(whoosh(1.0, up=True), fr(T["outro"] - 6), 0.2)
add(bell(note("C5"), 3.0, 1.0), fr(T["outro"] + 10), 0.16)
add(bell(note("G5"), 3.0, 1.0), fr(T["outro"] + 10), 0.08)

# ---------------- mix ----------------
n_out = int(DUR * SR)
L, R = L[:n_out], R[:n_out]
for d, g in [(0.029, 0.2), (0.043, 0.15), (0.067, 0.1)]:
    k = int(d * SR)
    L[k:] += g * R[:-k]
    R[k:] += g * L[:-k]
mix = np.stack([L, R], axis=1)
mix /= np.max(np.abs(mix)) + 1e-9
mix = np.tanh(mix * 1.5) / np.tanh(1.5) * 0.89
fi, fo = int(0.03 * SR), int(0.6 * SR)
mix[:fi] *= np.linspace(0, 1, fi)[:, None]
mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
os.makedirs("public/audio", exist_ok=True)
with wave.open("public/audio/soundtrack.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print(f"OK : {DUR:.2f} s")
