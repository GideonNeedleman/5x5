import { Stack } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function EditSetModal({ show, onHide, set }) {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Stack gap={2}>edit set here</Stack>
      </Modal.Body>
    </Modal>
  );
}

export default EditSetModal;
