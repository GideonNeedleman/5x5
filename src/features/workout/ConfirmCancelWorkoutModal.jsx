import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import vibrator from "vibrator";

function ConfirmCancelWorkoutModal({ onHide, show, handleClose }) {
  return (
    <Modal
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h3 className="text-center">Confirm cancel workout</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onHide();
            vibrator(1);
          }}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClose();
            vibrator(1);
          }}
          variant="warning"
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmCancelWorkoutModal;
