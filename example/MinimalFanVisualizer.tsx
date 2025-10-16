import { motion } from 'motion/react';

interface MinimalFanVisualizerProps {
  isPlaying: boolean;
  speed: number; // 0: low, 1: medium, 2: high
}

export function MinimalFanVisualizer({ isPlaying, speed }: MinimalFanVisualizerProps) {
  const speeds = [2.5, 1.5, 0.8]; // Rotation duration in seconds
  const rotationDuration = speeds[speed];

  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto">
      {/* Outer circle */}
      <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-800 transition-colors duration-300" />

      {/* Fan blades container */}
      <motion.div
        className="absolute inset-8"
        animate={{
          rotate: isPlaying ? 360 : 0,
        }}
        transition={{
          duration: rotationDuration,
          repeat: isPlaying ? Infinity : 0,
          ease: 'linear',
        }}
      >
        {/* Center hub */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white transition-colors duration-300" />
        </div>

        {/* Blades */}
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              transform: `rotate(${index * 90}deg)`,
            }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 origin-bottom">
              <motion.div
                className="w-16 h-24 -mt-24 rounded-t-full bg-slate-300 dark:bg-slate-700 transition-colors duration-300"
                animate={{
                  opacity: isPlaying ? 0.5 : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 transition-colors duration-300" />
      </div>

      {/* Rotation indicator when playing */}
      {isPlaying && (
        <motion.div
          className="absolute top-4 left-1/2 w-2 h-2 rounded-full bg-slate-900 dark:bg-white -translate-x-1/2 transition-colors duration-300"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </div>
  );
}
