import { Button, Col, Row } from "react-bootstrap";
import { BsStickyFill, BsLockFill, BsUnlockFill } from "react-icons/bs";

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
            onClick={() => setIsNoteVisible(true)}
            disabled={isFinished && !isUnlocked}
          >
            <BsStickyFill />
          </Button>
        </Col>
      )}
      <Col>
        {!isFinished ? (
          <Button className="w-100" type="submit">
            Finish Set
          </Button>
        ) : isUnlocked ? (
          <Button
            onClick={() => setIsUnlocked((prev) => !prev)}
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
