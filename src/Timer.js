import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);       // State for the timer's count
  const [isRunning, setIsRunning] = useState(false); // State to check if timer is running
  const intervalRef = useRef(null);          // Reference for interval

  // Function to start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);  // Increment every second
    }
  };

  // Function to pause the timer
  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current); // Stop the interval
    }
  };

  // Function to reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current); // Clear interval
    setTime(0);  // Reset time
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Timer: {time} seconds</h1>
      <button onClick={startTimer} disabled={isRunning}>Start</button>
      <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
