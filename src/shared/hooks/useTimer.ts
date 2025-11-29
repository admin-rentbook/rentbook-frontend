import { useEffect, useState } from 'react';
import { formatTime } from '../utils';
import {
  getDataFromSessStorage,
  saveDataToSessStorage,
} from '../utils/helpers';

export const useTimer = (time: number) => {
  const [timeLeft, setTimeLeft] = useState(time || 60);
  const [canResend, setCanResend] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    const timerStart = getDataFromSessStorage('verify-timer') as string;
    if (!timerStart) {
      setCanResend(true);
      setTimeLeft(0);
      return;
    }
    
    const startTime = parseInt(timerStart, 10);
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(time - elapsed, 0);
    
    setTimeLeft(remaining);
    setCanResend(remaining === 0);
    
    if (remaining > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [time, timerKey]);

  const resendCode = () => {
    saveDataToSessStorage('verify-timer', Date.now().toString());
    setTimerKey(prev => prev + 1);
  };

  return {
    timeLeft: formatTime(timeLeft),
    canResend,
    resendCode,
  };
};