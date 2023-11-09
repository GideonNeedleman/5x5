import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DoWorkout() {
  const {
    activeWorkout: workout,
    isWorkoutStarted,
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();

  function handleBack() {
    dispatch({ type: "clear-workout" });
    navigate("/");
  }

  function handleBeginWorkout() {
    dispatch({ type: "begin-workout" });
  }

  function handleFinishWorkout() {
    dispatch({ type: "finish-workout" });
    navigate("/");
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

      <Container>
        {workout.exercises.map((exercise) => (
          <Row key={exercise.name}>{exercise.name}</Row>
        ))}
      </Container>

      {isWorkoutStarted === true && (
        <Button className="w-100" onClick={handleFinishWorkout}>
          Finish Workout
        </Button>
      )}
    </Container>
  );
}

export default DoWorkout;
