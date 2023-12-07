import { Form, InputGroup } from "react-bootstrap";

function SetNote({
  register,
  isFinished = false,
  isUnlocked = true,
  defaultValue,
}) {
  return (
    <InputGroup>
      <Form.Control
        id="note"
        as="textarea"
        autoFocus
        placeholder="Write notes here..."
        aria-label="With textarea"
        disabled={isFinished && !isUnlocked}
        defaultValue={defaultValue}
        {...register(`note`)}
      />
    </InputGroup>
  );
}

export default SetNote;
