import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, Clock } from "lucide-react";
import { Button } from "./button";
import { Slider } from "./slider";
import { MinimalFanVisualizer } from "./MinimalFanVisualizer";
import { MinimalSpeedControl } from "./MinimalSpeedControl";
import { MinimalTimerControl } from "./MinimalTimerControl";

export function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fanSpeed, setFanSpeed] = useState(1); // 0: low, 1: medium, 2: high
  const [volume, setVolume] = useState([70]);
  const [timer, setTimer] = useState<number | null>(null); // minutes
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null); // seconds

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  // Initialize Web Audio API
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    gainNodeRef.current = audioContextRef.current.createGain();
    filterNodeRef.current = audioContextRef.current.createBiquadFilter();

    filterNodeRef.current.type = "lowpass";
    filterNodeRef.current.frequency.value = 800;

    filterNodeRef.current.connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContextRef.current.destination);
    gainNodeRef.current.gain.value = 0;

    return () => {
      stopWhiteNoise();
      audioContextRef.current?.close();
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current && isPlaying) {
      gainNodeRef.current.gain.value = volume[0] / 100;
    }
  }, [volume, isPlaying]);

  // Update fan speed sound characteristics
  useEffect(() => {
    if (filterNodeRef.current && isPlaying) {
      const frequencies = [600, 1000, 1500];
      filterNodeRef.current.frequency.value = frequencies[fanSpeed];
    }
  }, [fanSpeed, isPlaying]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setIsPlaying(false);
          setTimer(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const startWhiteNoise = () => {
    if (
      !audioContextRef.current ||
      !gainNodeRef.current ||
      !filterNodeRef.current
    )
      return;

    stopWhiteNoise();

    // Create white noise buffer
    const bufferSize = 2 * audioContextRef.current.sampleRate;
    const noiseBuffer = audioContextRef.current.createBuffer(
      1,
      bufferSize,
      audioContextRef.current.sampleRate
    );
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioContextRef.current.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    whiteNoise.connect(filterNodeRef.current);
    whiteNoise.start();

    oscillatorsRef.current.push(whiteNoise as any);
    gainNodeRef.current.gain.value = volume[0] / 100;
  };

  const stopWhiteNoise = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    oscillatorsRef.current = [];
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = 0;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopWhiteNoise();
      setIsPlaying(false);
    } else {
      startWhiteNoise();
      setIsPlaying(true);
    }
  };

  const handleTimerSelect = (minutes: number | null) => {
    setTimer(minutes);
    if (minutes) {
      setTimeRemaining(minutes * 60);
    } else {
      setTimeRemaining(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 pb-20">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-slate-900 dark:text-white transition-colors duration-300">
            风扇白噪音
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            帮助您放松、专注或安然入睡
          </p>
        </motion.div>

        {/* Fan Visualizer */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <MinimalFanVisualizer isPlaying={isPlaying} speed={fanSpeed} />
        </motion.div>

        {/* Play/Pause Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <Button
            onClick={togglePlay}
            size="lg"
            className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-lg transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </Button>
        </motion.div>

        {/* Timer Display */}
        {timeRemaining !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400"
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTime(timeRemaining)}</span>
          </motion.div>
        )}

        {/* Speed Control */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MinimalSpeedControl speed={fanSpeed} onSpeedChange={setFanSpeed} />
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Volume */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <span className="text-slate-700 dark:text-slate-300">音量</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                {volume[0]}%
              </span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
            />
          </div>

          {/* Timer */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <span className="text-slate-700 dark:text-slate-300">定时器</span>
            </div>
            <MinimalTimerControl
              timer={timer}
              onTimerChange={handleTimerSelect}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
