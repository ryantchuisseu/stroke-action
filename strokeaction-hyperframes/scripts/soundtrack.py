"""
Bande-son originale « Stroke Action — Chaque seconde compte » (46 s), synthétisée en numpy.
Calée sur la timeline GSAP de index.html.  Usage : python3 scripts/soundtrack.py
"""
import os
import wave

import numpy as np

SR = 48000
DUR = 46.0
N = int(DUR * SR) + SR
BEAT = 0.5  # 120 BPM
L = np.zeros(N)
R = np.zeros(N)
rng = np.random.default_rng(23)


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



def heartbeat():
    """lub-dub grave"""
    out = np.zeros(int(0.5 * SR))
    for off, g, f0 in ((0.0, 1.0, 62), (0.17, 0.7, 52)):
        t = tt(0.22)
        f = f0 + 40 * np.exp(-t * 30)
        s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 16) * g
        i = int(off * SR)
        out[i:i + len(s)] += s
    return out


def monitor():
    return beep(1046, 0.09)


def impact():
    t = tt(1.4)
    f = 38 + 70 * np.exp(-t * 12)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2)
    n = rng.standard_normal(len(t))
    n = lowpass(n, 0.08) * np.exp(-t * 9) * 2.5
    return np.tanh(1.8 * (boom + n))


def click():
    t = tt(0.05)
    n = rng.standard_normal(len(t))
    return (n - lowpass(n, 0.4)) * np.exp(-t * 160) + np.sin(2 * np.pi * 2200 * t) * np.exp(-t * 120) * 0.6


# ---------------- 0–14 s : tension ----------------
add(pad([note(n) for n in ["A2", "E3", "A3", "C4"]], 9.2), 0.0, 0.16)
for t0 in (0.5, 1.3, 2.1, 2.9, 3.7):
    add(heartbeat(), t0, 0.55)
    add(monitor(), t0 + 0.02, 0.08, 0.4)
# compteur de neurones : tics qui accélèrent puis ralentissent
t, dt = 0.4, 0.11
while t < 3.0:
    add(tick(), t, 0.05, -0.3)
    t += dt
    dt = 0.05 if t < 1.6 else dt * 1.12
# Chaque / seconde / compte
for t0 in (5.0, 6.3, 7.6):
    add(impact(), t0, 0.55)
    add(snap(), t0, 0.25)
add(whoosh(1.0, up=True), 8.1, 0.22)
# chiffres : pulsation de basse + pops
for b in range(10):
    t0 = 9.0 + b * BEAT
    add(kick(), t0, 0.32)
    add(bass(note("A1"), 0.4), t0, 0.22)
    add(tick(), t0 + 0.25, 0.04, 0.4)
add(pad([note(n) for n in ["F2", "C3", "A3", "C4"]], 5.2), 9.0, 0.12)
for i in range(4):
    add(pop_sfx(), 9.6 + i * 0.18, 0.12, -0.45 + i * 0.3)
add(whoosh(1.2, up=True), 12.9, 0.25)

# ---------------- 14–44 s : espoir (Do – Sol – Lam – Fa) ----------------
PROG = [
    (["C3", "E3", "G3", "C4"], ["C5", "E5", "G5", "C6"], "C2"),
    (["G2", "B2", "D3", "G3"], ["B4", "D5", "G5", "B5"], "G1"),
    (["A2", "C3", "E3", "A3"], ["C5", "E5", "A5", "C6"], "A1"),
    (["F2", "A2", "C3", "F3"], ["A4", "C5", "F5", "A5"], "F1"),
]
bar_t, k = 14.0, 0
while bar_t < 44.0:
    chord, arp, bn = PROG[k % 4]
    add(pad([note(n) for n in chord], 2.2), bar_t, 0.12)
    for i in range(8):
        add(pluck(note(arp[i % 4]) * (2 if i >= 4 else 1), 0.45), bar_t + i * BEAT / 2, 0.08, -0.3 if i % 2 else 0.3)
    for b in range(4):
        t0 = bar_t + b * BEAT
        add(kick(), t0, 0.42)
        add(bass(note(bn)), t0, 0.26)
        if b % 2:
            add(clap(), t0, 0.16, 0.1)
        add(hat(), t0 + BEAT / 2, 0.06, 0.5)
    bar_t += 4 * BEAT
    k += 1

# bruitages calés sur l'image
add(bell(note("C6"), 2.5, 1.2), 14.05, 0.12)
add(pop_sfx(), 15.15, 0.14)
for i in range(4):
    add(pop_sfx(), 19.5 + i * 0.16, 0.11, -0.45 + i * 0.3)
for i in range(4):
    add(beep(880 + i * 220, 0.08), 22.8 + i * 0.12, 0.05)
add(whoosh(0.8, up=False), 25.15, 0.22)
for i in range(5):
    add(whoosh(0.3, up=True), 30.3 + i * 0.14, 0.06, -0.5 + i * 0.25)
add(whoosh(0.9, up=True), 35.1, 0.2)
add(whoosh(1.5, up=False), 35.9, 0.1)
add(click(), 39.85, 0.4)
add(bell(note("E6"), 1.4, 1.0), 40.05, 0.12)
add(bell(note("G6"), 1.4, 1.0), 40.15, 0.1)
for i in range(4):
    add(pop_sfx(), 41.3 + i * 0.1, 0.1, -0.45 + i * 0.3)
add(click(), 43.05, 0.4)
add(bell(note("C6"), 1.6, 1.0), 43.2, 0.12)
add(whoosh(0.8, up=True), 43.8, 0.2)
# accord final
add(pad([note(n) for n in ["C3", "G3", "C4", "E4", "G4"]], 2.4), 43.8, 0.22)
add(bell(note("C5"), 3.0, 1.0), 44.2, 0.16)
add(bell(note("G5"), 3.0, 1.0), 44.25, 0.09)

# ---------------- mix ----------------
n_out = int(DUR * SR)
L, R = L[:n_out], R[:n_out]
for d, g in [(0.029, 0.2), (0.043, 0.15), (0.067, 0.1)]:
    kk = int(d * SR)
    L[kk:] += g * R[:-kk]
    R[kk:] += g * L[:-kk]
mix = np.stack([L, R], axis=1)
mix /= np.max(np.abs(mix)) + 1e-9
mix = np.tanh(mix * 1.5) / np.tanh(1.5) * 0.89
fi, fo = int(0.02 * SR), int(1.2 * SR)
mix[:fi] *= np.linspace(0, 1, fi)[:, None]
mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
with wave.open("assets/soundtrack.wav", "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print(f"OK : {DUR:.1f} s")
