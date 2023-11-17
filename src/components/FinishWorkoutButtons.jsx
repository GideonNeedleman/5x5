import { Button, Col, Row } from "react-bootstrap";

function FinishWorkoutButtons({
  isWorkoutStarted,
  isWorkoutFinished,
  handleFinishWorkout,
  handleCancelModal,
  handleConfirmationModal,
}) {
  return (
    <>
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
                Finish Incomplete Workout
              </Button>
            )}
          </Col>
        </Row>
      )}
    </>
  );
}

export default FinishWorkoutButtons;
