import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import DoExercise from "../components/DoExercise";
import { useState } from "react";
import ConfirmFinishWorkoutModal from "../components/ConfirmFinishWorkoutModal";
import { useFinishWorkout } from "../hooks/useFinishWorkout";

function DoWorkout() {
  const {
    activeWorkout: workout,
    isWorkoutStarted,
    activeKey,
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
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
    // If workout completed then don't need modal
    // Or change final 'rest timer' press trigger handleFinishWorkout
    setShow(true);
  }

  return (
    <Container as="main">
      <h1 className="display-3 text-center">{workout.name} </h1>

      {isWorkoutStarted === false && (
        <Row>
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

      {/* use index + activeKey to allow auto open accordion item */}
      <Accordion className="mt-2" defaultActiveKey={`0`}>
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
        <>
          <Button
            variant="secondary"
            className="w-100"
            onClick={handleConfirmationModal}
          >
            Finish Workout Early
          </Button>
        </>
      )}
      <ConfirmFinishWorkoutModal
        show={show}
        onHide={() => setShow(false)}
        handleClose={handleFinishWorkout}
      />
    </Container>
  );
}

export default DoWorkout;
