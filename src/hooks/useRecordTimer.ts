import { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

const useRecordTimer = () => {
  const [recordTimer, setRecordTimer] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const timerDocRef = doc(firestore, 'timers', 'sharedTimer');

  const startLocalTimer = () => {
    const id = setInterval(() => {
      setRecordTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setTimerId(id);
  };

  const stopLocalTimer = () => {
    if (timerId) clearInterval(timerId);
    setRecordTimer(0);
    setTimerId(null);
  };

  const startTimer = async () => {
    await updateDoc(timerDocRef, { running: true, startTime: new Date() });
  };

  const stopTimer = async () => {
    await updateDoc(timerDocRef, { running: false });
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(timerDocRef, (doc) => {
      const data = doc.data();
      if (data?.running) {
        if (!timerId) startLocalTimer();
      } else {
        stopLocalTimer();
      }
    });

    return () => unsubscribe();
  }, [timerId]);

  return {
    recordTimer,
    startTimer,
    stopTimer,
    formattedTimer: formatTime(recordTimer),
  };
};

export default useRecordTimer;