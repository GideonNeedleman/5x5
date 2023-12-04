import { Button, Col, Row } from "react-bootstrap";
import { BsStickyFill, BsLockFill, BsUnlockFill } from "react-icons/bs";
import vibrator from "vibrator";

function SetButtons({
  isNoteVisible,
  setIsNoteVisible,
  isFinished,
  isUnlocked,
  setIsUnlocked,
  setIsEditSet,
}) {
  return (
    <Row className="mt-3">
      {!isNoteVisible && (
        <Col xs={2}>
          <Button
            variant="secondary"
            className=""
            onClick={() => {
              setIsNoteVisible(true);
              vibrator(1);
            }}
            disabled={isFinished && !isUnlocked}
          >
            <BsStickyFill />
          </Button>
        </Col>
      )}
      <Col>
        {!isFinished ? (
          <Button className="w-100" type="submit" onClick={() => vibrator(100)}>
            Finish Set
          </Button>
        ) : isUnlocked ? (
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
        )}
      </Col>
    </Row>
  );
}

export default SetButtons;
