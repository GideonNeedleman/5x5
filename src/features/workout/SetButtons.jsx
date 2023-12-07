import { Button, Col, Row } from "react-bootstrap";
import {
  BsStickyFill,
  BsLockFill,
  BsUnlockFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import vibrator from "vibrator";
import RestTimerButton from "./RestTimerButton";
import { useState } from "react";

function SetButtons({
  isNoteVisible,
  setIsNoteVisible,
  isFinished,
  isUnlocked,
  setIsUnlocked,
  setIsEditSet,
  afterRestTimer,
}) {
  const [isDoneCountdown, setIsDoneCountDown] = useState(false);

  return (
    <>
      <Row className="mt-3">
        {!isNoteVisible && (
          <Col xs={6}>
            <Button
              variant="secondary"
              className="w-100"
              onClick={() => {
                setIsNoteVisible(true);
                vibrator(1);
              }}
              disabled={isFinished && !isUnlocked}
            >
              <BsStickyFill /> Note
            </Button>
          </Col>
        )}
        <Col>
          <Button variant="secondary" className="w-100">
            <BsInfoCircleFill /> Info
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {isDoneCountdown ? (
            isUnlocked ? (
              <Button
                onClick={() => {
                  setIsUnlocked((prev) => !prev);
                  vibrator(1);
                }}
                className="w-100"
                variant="primary"
              >
                <span>
                  <BsLockFill /> Save
                </span>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsUnlocked((prev) => !prev);
                  setIsEditSet(true);
                  vibrator(1);
                }}
                type="submit"
                className="w-100"
                variant="warning"
              >
                <span>
                  <BsUnlockFill /> Edit
                </span>
              </Button>
            )
          ) : (
            <RestTimerButton
              seconds={90}
              onClick={afterRestTimer}
              startTimer={isFinished}
              setIsDoneCountDown={setIsDoneCountDown}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default SetButtons;
