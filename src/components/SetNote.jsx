import { Form, InputGroup } from "react-bootstrap";

function SetNote({ set, register, exerciseId }) {
  return (
    <InputGroup className="mt-3">
      <Form.Control
        as="textarea"
        placeholder="Notes"
        aria-label="With textarea"
        {...register(`exercise-${exerciseId}-note-${set.id}`)}
      />
    </InputGroup>
  );
}

export default SetNote;
