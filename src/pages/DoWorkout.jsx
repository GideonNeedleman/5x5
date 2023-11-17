import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import DoExercise from "../components/DoExercise";
import { useState } from "react";
import ConfirmFinishWorkoutModal from "../components/ConfirmFinishWorkoutModal";
import { useFinishWorkout } from "../hooks/useFinishWorkout";
import ConfirmCancelWorkoutModal from "../components/ConfirmCancelWorkoutModal";

function DoWorkout() {
  const {
    activeWorkout: workout,
    isWorkoutStarted,
    activeKey,
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const numExercises = workout.exercises.length;
  const handleFinishWorkout = useFinishWorkout();

  function handleBack() {
    dispatch({ type: "clear-workout" });
    navigate("/");
  }

  function handleBeginWorkout() {
    dispatch({ type: "begin-workout" });
  }

  function handleConfirmationModal() {
    setShow(true);
  }

  function handleCancelModal() {
    setShowCancelModal(true);
  }

  return (
    <main>
      <h1 className="display-3 text-center">{workout.name} </h1>

      {isWorkoutStarted === false && (
        <Row className="mx-1 g-2">
          <Col xs={3}>
            <Button variant="warning" className="w-100" onClick={handleBack}>
              Back
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              className="w-100"
              onClick={handleBeginWorkout}
            >
              Begin Workout
            </Button>
          </Col>
        </Row>
      )}

      <Accordion defaultActiveKey={`0`}>
        {workout.exercises.map((exercise, index) => (
          <DoExercise
            exercise={exercise}
            numExercises={numExercises}
            index={index}
            tracker={index + activeKey}
            key={exercise.name}
          />
        ))}
      </Accordion>

      {isWorkoutStarted === true && (
        <Row className="mx-1 my-2 g-2">
          <Col xs={3}>
            <Button
              variant="warning"
              className="w-100"
              onClick={handleCancelModal}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="w-100"
              onClick={handleConfirmationModal}
            >
              Finish Workout Early
            </Button>
          </Col>
        </Row>
      )}
      <ConfirmFinishWorkoutModal
        show={show}
        onHide={() => setShow(false)}
        handleClose={handleFinishWorkout}
      />
      <ConfirmCancelWorkoutModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        handleClose={handleBack}
      />
    </main>
  );
}

export default DoWorkout;
