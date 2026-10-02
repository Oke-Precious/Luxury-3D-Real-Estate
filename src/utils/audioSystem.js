/**
 * Architectural Procedural Audio System (Web Audio API)
 * Subtle ambient ocean/breeze soundscape and delicate tactile interface sounds.
 * Fully procedural: 0 external audio assets needed, perfectly reliable.
 */

class AudioSystem {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.osc1 = null;
    this.osc2 = null;
    this.isMuted = true;
    this.listeners = new Set();
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio API not supported in this browser", e);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isPlaying && !this.isMuted);
    return () => this.listeners.delete(callback);
  }

  notify() {
    const active = this.isPlaying && !this.isMuted;
    this.listeners.forEach((cb) => cb(active));
  }

  toggleSound() {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      this.startAmbient();
      this.isMuted = false;
      this.isPlaying = true;
    } else {
      if (this.isMuted) {
        this.unmute();
      } else {
        this.mute();
      }
    }
    this.notify();
    return !this.isMuted;
  }

  startAmbient() {
    if (!this.ctx) return;

    // Create continuous organic ocean/breeze pink noise
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.02; // Keep ambient volume extremely subtle
      b6 = white * 0.115926;
    }

    this.whiteNoise = this.ctx.createBufferSource();
    this.whiteNoise.buffer = noiseBuffer;
    this.whiteNoise.loop = true;

    // Low-pass filter for ocean wave & distant wind quality
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO to slowly sweep filter frequency (simulating gentle ocean tidal rhythm)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // ~12s wave cycle
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    lfo.start();

    // Subtle warm sub-harmonic drone (deep architectural stillness)
    this.subDrone = this.ctx.createOscillator();
    this.subDrone.type = "sine";
    this.subDrone.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.008, this.ctx.currentTime);
    this.subDrone.connect(subGain);
    subGain.connect(this.masterGain);
    this.subDrone.start();

    this.whiteNoise.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);
    this.whiteNoise.start();

    // Fade in gently
    this.masterGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3);
  }

  mute() {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
    this.isMuted = true;
    this.notify();
  }

  unmute() {
    if (!this.masterGain || !this.ctx) return;
    this.masterGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 1.2);
    this.isMuted = false;
    this.notify();
  }

  // Tactile micro-interaction: subtle architectural click
  playClick() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // safe fallback
    }
  }

  // Spatial transition chime when entering chapters or 3D hotspots
  playTransition() {
    if (!this.ctx || this.isMuted) return;
    try {
      const chord = [330, 440, 554, 659]; // E major harmonic
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        const startTime = this.ctx.currentTime + idx * 0.04;
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.02, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(startTime);
        osc.stop(startTime + 1.3);
      });
    } catch {
      // safe fallback
    }
  }
}

export const audioSystem = new AudioSystem();
