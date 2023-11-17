import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import DoExercise from "../components/DoExercise";
import { useEffect, useState } from "react";
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
  const [numFinishedExercises, setNumFinishedExercises] = useState(0);
  const numExercises = workout.exercises.length;
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
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

  useEffect(() => {
    console.log("finished exercises: ", numFinishedExercises);
    console.log("total exercises ", numExercises);
    if (numFinishedExercises === numExercises) setIsWorkoutFinished(true);
  }, [numFinishedExercises, numExercises]);

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
            setNumFinishedExercises={setNumFinishedExercises}
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
            {isWorkoutFinished ? (
              <Button
                variant="primary"
                className="w-100"
                onClick={handleFinishWorkout}
              >
                Finish Workout
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="w-100"
                onClick={handleConfirmationModal}
              >
                Finish Workout Early
              </Button>
            )}
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
