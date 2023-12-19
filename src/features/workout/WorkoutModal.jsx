// import { useState } from "react";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import vibrator from "vibrator";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function WorkoutModal({ show, onHide, workout, location }) {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Title className="text-center display-4 mt-2">
        {workout.name}
      </Modal.Title>
      <Modal.Body>
        <Stack gap={2}>
          <Button
            onClick={() => {
              navigate(`/edit-workout/${workout.id}`);
              vibrator(1);
            }}
          >
            Edit
          </Button>
          {/* <Button
            onClick={() => setTestMessage(`This will COPY ${workout.name}`)}
            variant="secondary"
          >
            Copy
          </Button> */}
          {location === "myworkouts" && (
            <Button
              onClick={() => {
                dispatch({ type: "remove-workout", payload: workout });
                vibrator(1);
                onHide();
              }}
              variant="danger"
            >
              Remove
            </Button>
          )}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
