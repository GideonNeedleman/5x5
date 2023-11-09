import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

function DoExercise({ exercise, index }) {
  return (
    <Accordion.Item eventKey={`${index}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className="fw-bold">{exercise.name}</span>
          <span className="mx-1">{exercise.sets} sets</span>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <>
          Map over sets when open
          <Button
            className="w-100 my-2"
            onClick={() => setActiveKey((prev) => prev - 1)}
          >
            Rest Timer
          </Button>
        </>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoExercise;
