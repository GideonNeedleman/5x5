import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function WorkoutModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Body>
        <Stack gap={2}>
          <Button>Edit</Button>
          <Button variant="secondary">Copy</Button>
          <Button variant="danger">Delete</Button>
        </Stack>
      </Modal.Body>
      {/*       <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
