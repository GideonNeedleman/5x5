import { Button, Col, Row } from "react-bootstrap";
import { BsStickyFill } from "react-icons/bs";

function SetButtons({
  isNoteVisible,
  setIsNoteVisible,
  handleClick,
  isLastSet,
}) {
  return (
    <Row className="mt-3">
      {!isNoteVisible && (
        <Col xs={2}>
          <Button
            variant="secondary"
            className=""
            onClick={() => setIsNoteVisible(true)}
          >
            <BsStickyFill />
          </Button>
        </Col>
      )}
      <Col>
        <Button className="w-100" onClick={handleClick}>
          {isLastSet ? "Finish Set" : "Finish Set"}
        </Button>
      </Col>
    </Row>
  );
}

export default SetButtons;
