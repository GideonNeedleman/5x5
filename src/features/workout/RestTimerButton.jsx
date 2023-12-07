import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function RestTimerButton({ seconds, onClick, startTimer }) {
  const [countdown, setCountdown] = useState(seconds);

  const timerId = useRef();

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
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
          onClick={() => setCountdown(0)}
        >
          Rest Timer: {formatTime(countdown)}
        </Button>
      ) : (
        <Button className="w-100" type="submit">
          Start Rest Timer
        </Button>
      )}
    </>
  );
}

export default RestTimerButton;
