import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmFinishWorkoutModal({ onHide, show, handleClose }) {
  return (
    <Modal
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p>Are you sure you want to finish the workout?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          Cancel
        </Button>
        <Button onClick={onHide}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmFinishWorkoutModal;
