import Accordion from "react-bootstrap/Accordion";

function DoExercise({ exercise }) {
  return (
    <Accordion.Item eventKey={exercise.name}>
      <Accordion.Header>{exercise.name}</Accordion.Header>
      <Accordion.Body>Map over sets when open</Accordion.Body>
    </Accordion.Item>
  );
}

export default DoExercise;
