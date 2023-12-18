import { useState } from "react";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import vibrator from "vibrator";
import { useGlobalContext } from "../../context/GlobalContext";

export default function WorkoutModal({ show, onHide, workout }) {
  const { dispatch } = useGlobalContext();
  const [testMessage, setTestMessage] = useState();

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Title className="text-center">{testMessage}</Modal.Title>
      <Modal.Body>
        <Stack gap={2}>
          {/* <Button
            onClick={() => setTestMessage(`This will EDIT ${workout.name}`)}
          >
            Edit
          </Button>
          <Button
            onClick={() => setTestMessage(`This will COPY ${workout.name}`)}
            variant="secondary"
          >
            Copy
          </Button> */}
          <Button
            onClick={() => {
              dispatch({ type: "remove-workout", payload: workout });
              vibrator(1);
            }}
            variant="danger"
          >
            Remove
          </Button>
        </Stack>
      </Modal.Body>
      {/*       <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
