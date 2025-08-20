import { useRef, useCallback } from 'react';

interface LoFiConfig {
  category: 'physical' | 'mental' | 'emotional' | 'social';
  baseFreq: number;
  harmonics: number[];
  rhythm: number;
  ambience: string;
}

const categoryConfigs: Record<string, LoFiConfig> = {
  physical: {
    category: 'physical',
    baseFreq: 80,
    harmonics: [1, 1.5, 2, 3],
    rhythm: 0.8,
    ambience: 'energetic'
  },
  mental: {
    category: 'mental', 
    baseFreq: 60,
    harmonics: [1, 2, 4],
    rhythm: 0.4,
    ambience: 'focused'
  },
  emotional: {
    category: 'emotional',
    baseFreq: 70,
    harmonics: [1, 1.2, 1.8, 2.5],
    rhythm: 0.6,
    ambience: 'warm'
  },
  social: {
    category: 'social',
    baseFreq: 90,
    harmonics: [1, 1.25, 1.5, 2, 2.5],
    rhythm: 0.7,
    ambience: 'uplifting'
  }
};

export const useLoFiAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const isPlayingRef = useRef(false);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const createLoFiLayer = useCallback((freq: number, gain: number, audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    // Lo-Fi characteristics
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
    
    // Warm, muffled filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
    filter.Q.setValueAtTime(0.5, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(gain, audioContext.currentTime + 0.5);
    
    // Add subtle modulation for organic feel
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.3, audioContext.currentTime);
    lfoGain.gain.setValueAtTime(freq * 0.02, audioContext.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    lfo.start();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return { oscillator, gainNode, lfo };
  }, []);

  const startLoFi = useCallback((category: 'physical' | 'mental' | 'emotional' | 'social') => {
    if (isPlayingRef.current) return;
    
    const audioContext = initAudioContext();
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const config = categoryConfigs[category];
    const layers: { oscillator: OscillatorNode; gainNode: GainNode; lfo: OscillatorNode }[] = [];
    
    // Create harmonic layers
    config.harmonics.forEach((harmonic, index) => {
      const freq = config.baseFreq * harmonic;
      const gain = 0.1 / (index + 1); // Diminishing harmonics
      const layer = createLoFiLayer(freq, gain, audioContext);
      layers.push(layer);
    });
    
    // Start all oscillators
    layers.forEach(({ oscillator, lfo }) => {
      oscillator.start();
      oscillatorsRef.current.push(oscillator);
      oscillatorsRef.current.push(lfo);
    });
    
    gainNodesRef.current = layers.map(l => l.gainNode);
    isPlayingRef.current = true;
    
    // Add subtle rhythm variation
    const rhythmInterval = setInterval(() => {
      if (!isPlayingRef.current) {
        clearInterval(rhythmInterval);
        return;
      }
      
      gainNodesRef.current.forEach((gainNode, index) => {
        const variation = 1 + (Math.sin(Date.now() * 0.001 * config.rhythm) * 0.2);
        const baseGain = 0.1 / (index + 1);
        gainNode.gain.setValueAtTime(baseGain * variation, audioContext.currentTime);
      });
    }, 100);
    
  }, [initAudioContext, createLoFiLayer]);

  const stopLoFi = useCallback(() => {
    if (!isPlayingRef.current) return;
    
    // Fade out
    gainNodesRef.current.forEach(gainNode => {
      gainNode.gain.linearRampToValueAtTime(0, (audioContextRef.current?.currentTime || 0) + 0.5);
    });
    
    // Stop oscillators after fade
    setTimeout(() => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscillator might already be stopped
        }
      });
      oscillatorsRef.current = [];
      gainNodesRef.current = [];
      isPlayingRef.current = false;
    }, 600);
  }, []);

  return { startLoFi, stopLoFi, isPlaying: isPlayingRef.current };
};