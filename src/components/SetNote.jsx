import { Form, InputGroup } from "react-bootstrap";

function SetNote() {
  return (
    <InputGroup className="mt-3">
      <Form.Control
        as="textarea"
        placeholder="Notes"
        aria-label="With textarea"
      />
    </InputGroup>
  );
}

export default SetNote;
