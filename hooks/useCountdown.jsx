import { useState, useEffect, useRef } from "react";

const useCountdown = (
  startingTime,
  defaultPlay = true,
  onCountdownEnd = () => {}
) => {
  const [time, setTime] = useState(startingTime);
  const [timerOn, setTimerOn] = useState(defaultPlay);

  const timerRef = useRef(null);

  const pause = () => {
    setTimerOn(false);
  };

  const start = () => {
    setTimerOn(true);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTime(startingTime);
  };

  // every second.
  useEffect(() => {
    if (timerOn) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          // If the time has reached zero, stop the countdown and set the time to zero.
          if (prevTime === 0) {
            setTimerOn(false);
            clearInterval(timerRef.current);
            onCountdownEnd(); //if provided run this callback when countdown ends

            return 0;
          } else {
            // Otherwise, subtract one second from the previous time and update the state.
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [timerOn]);

  return { time, timerOn, pause, start, reset };
};

export default useCountdown;
