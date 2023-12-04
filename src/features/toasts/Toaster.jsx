import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import { useGlobalContext } from "../../context/GlobalContext";
import { ToastContainer } from "react-bootstrap";

function Toaster() {
  const { isWorkoutStarted, isWorkoutFinished } = useGlobalContext();
  const [showStart, setShowStart] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    if (isWorkoutStarted) setShowStart(true);
    if (isWorkoutFinished) setShowFinish(true);
  }, [isWorkoutStarted, isWorkoutFinished]);

  return (
    <>
      {/* Start toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          onClose={() => setShowStart(false)}
          bg="success"
          show={showStart}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Workout Started</strong>
          </Toast.Header>
          <Toast.Body className="text-center text-light fw-bold">
            <span>You&apos;ve got this!</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Finish toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          onClose={() => setShowFinish(false)}
          bg="success"
          show={showFinish}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Workout Finished</strong>
          </Toast.Header>
          <Toast.Body className="text-center text-light fw-bold">
            <span>Great job!</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Toaster;
