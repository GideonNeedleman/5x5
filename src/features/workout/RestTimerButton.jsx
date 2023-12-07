import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function RestTimerButton({ seconds, onClick, startTimer, setIsDoneCountDown }) {
  const [countdown, setCountdown] = useState(seconds);

  const timerId = useRef();

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes >= 1) {
      // if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;

      return minutes + ":" + seconds;
    }

    if (minutes === 0) return seconds + "s";
  }

  useEffect(() => {
    if (startTimer) {
      timerId.current = setInterval(
        () => setCountdown((prev) => prev - 1),
        1000
      );
    }
  }, [startTimer]);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      setIsDoneCountDown(true);
      setCountdown(1);
      onClick();
    }
  }, [countdown, onClick]);

  return (
    <>
      {startTimer ? (
        <Button
          className="w-100"
          variant="warning"
          size="lg"
          onClick={() => setCountdown(0)}
        >
          <span className="fw-bold">{formatTime(countdown)}</span>
        </Button>
      ) : (
        <Button className="w-100" type="submit" size="lg">
          <span className="fw-bold">{formatTime(countdown)}</span> Rest
        </Button>
      )}
    </>
  );
}

export default RestTimerButton;
