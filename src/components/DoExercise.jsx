import Accordion from "react-bootstrap/Accordion";

function DoExercise({ exercise, index }) {
  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className="fw-bold">{exercise.name}</span>
          <span className="mx-1">{exercise.sets} sets</span>
        </span>
      </Accordion.Header>
      <Accordion.Body>Map over sets when open</Accordion.Body>
    </Accordion.Item>
  );
}

export default DoExercise;
