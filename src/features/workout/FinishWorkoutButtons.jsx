import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useGlobalContext } from "../../context/GlobalContext";
import vibrator from "vibrator";

function FinishWorkoutButtons({
  isWorkoutStarted,
  isWorkoutFinished,
  handleCancelModal,
  handleConfirmationModal,
}) {
  const { handleFinishWorkout } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <>
      {isWorkoutStarted === true && (
        <Row className="mx-1 my-2 g-2">
          <Col xs={3}>
            <Button
              variant="warning"
              className="w-100"
              onClick={() => {
                handleCancelModal();
                vibrator(1);
              }}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            {isWorkoutFinished ? (
              <Button
                variant="primary"
                className="w-100"
                type="submit"
                onClick={() => {
                  handleFinishWorkout();
                  navigate("/review");
                  vibrator([20, 10, 20, 10, 500]);
                }}
              >
                Finish Workout
              </Button>
            ) : (
              <Button
                variant="secondary"
                className="w-100"
                onClick={() => {
                  handleConfirmationModal();
                  vibrator(1);
                }}
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
