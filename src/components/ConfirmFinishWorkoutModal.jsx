import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGlobalContext } from "../context/GlobalContext";

function ConfirmFinishWorkoutModal({ onHide, show }) {
  const { handleFinishWorkout } = useGlobalContext();

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
        <Button onClick={handleFinishWorkout}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmFinishWorkoutModal;
