import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface MinimalTimerControlProps {
  timer: number | null; // minutes
  onTimerChange: (minutes: number | null) => void;
}

export function MinimalTimerControl({ timer, onTimerChange }: MinimalTimerControlProps) {
  const timerOptions = [
    { value: 15, label: '15分钟' },
    { value: 30, label: '30分钟' },
    { value: 60, label: '60分钟' },
  ];

  return (
    <div className="flex items-center gap-2">
      {timerOptions.map((option) => {
        const isActive = timer === option.value;
        return (
          <button
            key={option.value}
            onClick={() => (isActive ? onTimerChange(null) : onTimerChange(option.value))}
            className={`flex-1 py-2.5 px-3 rounded-lg text-sm transition-all duration-200 border-2 ${
              isActive
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                : 'bg-transparent text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {option.label}
          </button>
        );
      })}

      {timer !== null && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => onTimerChange(null)}
          className="p-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </motion.button>
      )}
    </div>
  );
}
