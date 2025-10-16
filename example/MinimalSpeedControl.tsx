import { motion } from 'motion/react';

interface MinimalSpeedControlProps {
  speed: number; // 0: low, 1: medium, 2: high
  onSpeedChange: (speed: number) => void;
}

export function MinimalSpeedControl({ speed, onSpeedChange }: MinimalSpeedControlProps) {
  const speeds = [
    { value: 0, label: '低速' },
    { value: 1, label: '中速' },
    { value: 2, label: '高速' },
  ];

  return (
    <div className="relative flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-full transition-colors duration-300">
      {/* Background indicator */}
      <motion.div
        className="absolute h-[calc(100%-8px)] bg-slate-900 dark:bg-white rounded-full transition-colors duration-300"
        animate={{
          left: `${(speed * 33.333) + 4}%`,
          width: 'calc(33.333% - 8px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      />

      {/* Buttons */}
      {speeds.map((s) => (
        <button
          key={s.value}
          onClick={() => onSpeedChange(s.value)}
          className="relative flex-1 py-2.5 px-4 rounded-full transition-all duration-200 z-10"
        >
          <span
            className={`text-sm transition-colors duration-200 ${
              speed === s.value
                ? 'text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {s.label}
          </span>
        </button>
      ))}
    </div>
  );
}
