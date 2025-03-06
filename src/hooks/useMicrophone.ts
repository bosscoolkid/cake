import { useState, useRef, useEffect } from 'react';

const BLOW_THRESHOLD = 300; // ค่าที่ใช้ในการตรวจจับเสียง สามารถเพิ่มลดได้้
const DEFAULT_FLAME_INTENSITY = 100;
const FLAME_DECREASE_FACTOR = 2;
const FLAME_RECOVERY_RATE = 0.5;

export const useMicrophone = (candleCount: number) => {
  const [isBlowing, setIsBlowing] = useState(false);
  const [flameIntensity, setFlameIntensity] = useState<number[]>(
    Array(candleCount).fill(DEFAULT_FLAME_INTENSITY)
  );
  const [microphoneActive, setMicrophoneActive] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioContext = window.AudioContext || 
        (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      
      setMicrophoneActive(true);
      monitorAudioLevels();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to blow out the candles!");
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    analyserRef.current = null;
    dataArrayRef.current = null;
    setMicrophoneActive(false);
    setIsBlowing(false);
  };

  const monitorAudioLevels = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const average = dataArrayRef.current.reduce((acc, val) => acc + val, 0) / 
                    dataArrayRef.current.length;
    
    const isCurrentlyBlowing = average > BLOW_THRESHOLD;
    setIsBlowing(isCurrentlyBlowing);
    
    setFlameIntensity(prev => {
      if (isCurrentlyBlowing) {
        const blowStrength = Math.min(100, average) / FLAME_DECREASE_FACTOR;
        return prev.map(intensity => Math.max(0, intensity - blowStrength));
      } else {
        return prev.map(intensity => 
          intensity < DEFAULT_FLAME_INTENSITY && intensity > 0
            ? Math.min(DEFAULT_FLAME_INTENSITY, intensity + FLAME_RECOVERY_RATE)
            : intensity
        );
      }
    });
    
    animationFrameRef.current = requestAnimationFrame(monitorAudioLevels);
  };

  const toggleMicrophone = () => {
    if (microphoneActive) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    isBlowing,
    microphoneActive,
    flameIntensity,
    toggleMicrophone,
    setFlameIntensity
  };
};