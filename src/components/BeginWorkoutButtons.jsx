import { Button, Col, Row } from "react-bootstrap";

function BeginWorkoutButtons({
  isWorkoutStarted,
  handleBack,
  handleBeginWorkout,
}) {
  return (
    <>
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
    </>
  );
}

export default BeginWorkoutButtons;
