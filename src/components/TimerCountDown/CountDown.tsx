import React, { useEffect } from "react";
import CountDown from "react-countdown";
import styles from "./CountDown.module.css";

interface CountDownTimeProps {
  isStart?: boolean;
  className?: string;
  seconds?: number;
  onComplete?: () => void;
}

function CountDownTime({
  isStart = true,
  seconds = 0,
  onComplete,
  className,
}: CountDownTimeProps) {
  const countdownref = React.createRef<CountDown>();
  useEffect(() => {
    if (isStart) {
      countdownref.current?.start();
    } else {
      countdownref.current?.stop();
    }
  }, [countdownref, isStart, seconds]);
  return (
    <div className={className}>
      <CountDown
        ref={countdownref}
        autoStart
        date={Date.now() + seconds * 1000}
        onComplete={onComplete}
        renderer={(value) => {
          return (
            <div className={styles.time}>
              <span>{value.formatted.minutes}</span>
              <p>:</p>
              <span>{value.formatted.seconds}</span>
            </div>
          );
        }}
      />
    </div>
  );
}

export default CountDownTime;
