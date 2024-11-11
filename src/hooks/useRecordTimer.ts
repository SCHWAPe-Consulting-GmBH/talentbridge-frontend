import { useState } from 'react';

const useRecordTimer = () => {
  const [recordTimer, setRecordTimer] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const id = setInterval(() => {
      setRecordTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setTimerId(id);
  };

  const stopTimer = () => {
    if (timerId) clearInterval(timerId);
    setRecordTimer(0);
    setTimerId(null);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return {
    recordTimer,
    startTimer,
    stopTimer,
    formattedTimer: formatTime(recordTimer),
  };
};

export default useRecordTimer;
