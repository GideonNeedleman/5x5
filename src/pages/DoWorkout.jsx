import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import DoExercise from "../components/DoExercise";
import { useState } from "react";

function DoWorkout() {
  const {
    activeWorkout: workout,
    isWorkoutStarted,
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(1);

  function handleBack() {
    dispatch({ type: "clear-workout" });
    navigate("/");
  }

  function handleBeginWorkout() {
    dispatch({ type: "begin-workout" });
    setActiveKey(0);
  }

  function handleFinishWorkout() {
    dispatch({ type: "finish-workout" });
    navigate("/history");
  }

  return (
    <Container as="main">
      <h1 className="display-1 text-center">{workout.name} </h1>

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
            index={index + activeKey}
            key={exercise.name}
          />
        ))}
      </Accordion>

      {isWorkoutStarted === true && (
        <>
          {/*           <Button
            className="w-100 my-2"
            onClick={() => setActiveKey((prev) => prev - 1)}
          >
            Increment
          </Button> */}
          <Button
            variant="secondary"
            className="w-100"
            onClick={handleFinishWorkout}
          >
            Finish Workout
          </Button>
        </>
      )}
    </Container>
  );
}

export default DoWorkout;
