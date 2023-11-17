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
        <h3 className="text-center">Confirm finish workout early</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="secondary">
          Cancel
        </Button>
        {/* need to submit form from modal */}
        <Button type="submit" onClick={onHide}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmFinishWorkoutModal;
