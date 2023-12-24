import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGlobalContext } from "../../context/GlobalContext";
import vibrator from "vibrator";
import { Form } from "react-bootstrap";
import { useState } from "react";

function SaveModal({ /* onHide, */ show, workout /* setShowSaveModal */ }) {
  const { workoutData, handleFinishJustGo, dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState();

  const newWorkout = {
    ...workout,
    name: workoutName,
    id: workoutData.length + 1,
  };
  console.log("new workout", newWorkout);

  return (
    <Modal
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h3 className="text-center">
          Enter name to save this workout for later:
        </h3>
        <Form.Control
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
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
            dispatch({ type: "create-new-workout", payload: newWorkout });
            handleFinishJustGo();
            navigate("/review");
            vibrator([100, 100, 100, 100, 500]);
          }}
          disabled={!workoutName}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SaveModal;
