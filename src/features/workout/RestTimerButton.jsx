import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function RestTimerButton({ seconds, onClick }) {
  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef();

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes <= 10) minutes = "0" + minutes;
    if (seconds <= 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
  }

  const timer = () => {
    timerId.current = setInterval(() => setCountdown((prev) => prev - 1), 1000);
  };
  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      onClick();
      setCountdown(1);
    }
  }, [countdown, onClick]);

  return (
    <Button type="submit" onClick={timer}>
      {countdown}
    </Button>
  );
}

export default RestTimerButton;
