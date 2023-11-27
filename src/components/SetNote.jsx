import { Form, InputGroup } from "react-bootstrap";

function SetNote({ register, isFinished, isUnlocked }) {
  return (
    <InputGroup className="mt-3">
      <Form.Control
        as="textarea"
        placeholder="Write notes here..."
        aria-label="With textarea"
        disabled={isFinished && !isUnlocked}
        {...register(`note`)}
      />
    </InputGroup>
  );
}

export default SetNote;
