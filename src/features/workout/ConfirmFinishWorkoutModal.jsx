import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGlobalContext } from "../../context/GlobalContext";
import vibrator from "vibrator";

function ConfirmFinishWorkoutModal({ onHide, show, justGo, setShowSaveModal }) {
  const { handleFinishWorkout } = useGlobalContext();
  const navigate = useNavigate();

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
          onClick={
            justGo
              ? () => {
                  setShowSaveModal(true);
                  vibrator(1);
                  onHide();
                }
              : () => {
                  handleFinishWorkout();
                  navigate("/review");
                  vibrator([100, 100, 100, 100, 500]);
                }
          }
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmFinishWorkoutModal;
