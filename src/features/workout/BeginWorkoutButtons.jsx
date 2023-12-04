import { Button, Col, Row } from "react-bootstrap";
import vibrator from "vibrator";

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
            <Button
              variant="warning"
              className="w-100"
              onClick={() => {
                handleBack();
                vibrator(1);
              }}
            >
              Back
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              className="w-100"
              onClick={() => {
                handleBeginWorkout();
                vibrator(200);
              }}
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
