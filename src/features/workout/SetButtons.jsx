import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import {
  BsStickyFill,
  BsLockFill,
  BsUnlockFill,
  BsInfoCircleFill,
} from "react-icons/bs";
import vibrator from "vibrator";
import RestTimerButton from "./RestTimerButton";
import { useState } from "react";
import InfoModal from "./InfoModal";

function SetButtons({
  isNoteVisible,
  setIsNoteVisible,
  isFinished,
  isUnlocked,
  setIsUnlocked,
  setIsEditSet,
  afterRestTimer,
  exercise,
}) {
  const [isDoneCountdown, setIsDoneCountDown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => setIsModalOpen(true)}
          >
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
              seconds={exercise.restTimer}
              onClick={afterRestTimer}
              setIsDoneCountDown={setIsDoneCountDown}
            />
          )}
        </Col>
      </Row>
      <InfoModal show={isModalOpen} onHide={() => setIsModalOpen(false)} />
    </>
  );
}

export default SetButtons;
