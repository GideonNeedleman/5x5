import { Button, Col, Row } from "react-bootstrap";
import { BsStickyFill } from "react-icons/bs";
import { useGlobalContext } from "../context/GlobalContext";

function SetButtons({
  isNoteVisible,
  setIsNoteVisible,
  handleClick,
  isLastSet,
  isFinished,
}) {
  const { isWorkoutStarted } = useGlobalContext();
  return (
    <Row className="mt-3">
      {!isNoteVisible && (
        <Col xs={2}>
          <Button
            variant="secondary"
            className=""
            onClick={() => setIsNoteVisible(true)}
            disabled={!isWorkoutStarted}
          >
            <BsStickyFill />
          </Button>
        </Col>
      )}
      <Col>
        <Button
          className="w-100"
          onClick={handleClick}
          disabled={!isWorkoutStarted || isFinished}
        >
          {isLastSet ? "Finish Set" : "Finish Set"}
        </Button>
      </Col>
    </Row>
  );
}

export default SetButtons;
