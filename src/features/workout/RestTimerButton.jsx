import { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import vibrator from "vibrator";
import { BsDashLg, BsPlusLg } from "react-icons/bs";

function RestTimerButton({ seconds, onClick, setIsDoneCountDown }) {
  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef();

  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes >= 1) {
      if (seconds < 10) seconds = "0" + seconds;
      return minutes + ":" + seconds;
    }

    if (minutes === 0)
      if (seconds < 10) return "0:0" + seconds;
      else return "0:" + seconds;
  }

  function startTimer() {
    timerId.current = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    vibrator(1);
  }

  useEffect(() => {
    if (timerId.current && countdown <= 0) {
      clearInterval(timerId.current);
      setIsDoneCountDown(true);
      setCountdown(1);
      onClick();
    }
  }, [countdown, onClick, setIsDoneCountDown]);

  return (
    <>
      <ButtonGroup className="w-100" size="lg">
        <Button
          variant={timerId.current ? "warning" : "primary"}
          onClick={() => {
            setCountdown((prev) => prev - 30);
            vibrator(1);
          }}
        >
          <BsDashLg />
        </Button>
        {timerId.current ? (
          <Button
            className="w-100"
            variant="warning"
            size="lg"
            onClick={() => {
              setCountdown(0);
              vibrator(1);
            }}
          >
            <span className="fw-bold">{formatTime(countdown)}</span>
          </Button>
        ) : (
          <Button
            className="w-100"
            onClick={() => {
              startTimer();
              vibrator(1);
            }}
            type="submit"
            size="lg"
          >
            {countdown <= 0 ? (
              "Finish Set"
            ) : (
              <>
                <span>Rest </span>
                <span className="fw-bold">{formatTime(countdown)}</span>
              </>
            )}
          </Button>
        )}
        <Button
          variant={timerId.current ? "warning" : "primary"}
          onClick={() => {
            setCountdown((prev) => prev + 30);
            vibrator(1);
          }}
        >
          <BsPlusLg />
        </Button>
      </ButtonGroup>
    </>
  );
}

export default RestTimerButton;
