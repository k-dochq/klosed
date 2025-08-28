import { useState, useCallback } from 'react';

interface UseTimerOptions {
  initialTime?: number;
  onComplete?: () => void;
}

export function useTimer({ initialTime = 180, onComplete }: UseTimerOptions = {}) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsActive(true);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsActive(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [initialTime, onComplete]);

  const stopTimer = useCallback(() => {
    setTimeLeft(0);
    setIsActive(false);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    formattedTime: formatTime(timeLeft),
  };
}
