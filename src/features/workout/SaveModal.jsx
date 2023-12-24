import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGlobalContext } from "../../context/GlobalContext";
import vibrator from "vibrator";

function SaveModal({ onHide, show /* setShowSaveModal */ }) {
  const { handleFinishJustGo } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <Modal
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h3 className="text-center">
          Do you want to save this workout for later?
        </h3>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleFinishJustGo();
            // onHide();
            navigate("/review");
            vibrator(1);
          }}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleFinishJustGo();
            navigate("/review");
            vibrator([100, 100, 100, 100, 500]);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SaveModal;
