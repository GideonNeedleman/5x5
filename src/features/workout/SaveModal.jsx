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
  // console.log("new/expanded workout", newWorkout);

  return (
    <Modal
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h3 className="text-center">
          Enter name to save exercises as a workout:
        </h3>
        <Form.Control
          type="text"
          placeholder="Workout name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <p className="mt-3 mb-0 text-center">
          Or you can just submit data without saving the workout
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleFinishJustGo();
            navigate("/review");
            vibrator(1);
          }}
          variant="secondary"
        >
          Just Submit Data
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: "create-new-workout", payload: newWorkout });
            dispatch({ type: "add-workout", payload: newWorkout });
            handleFinishJustGo();
            navigate("/review");
            vibrator([100, 100, 100, 100, 500]);
          }}
          disabled={!workoutName}
        >
          Save Workout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SaveModal;
