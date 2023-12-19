// import { useState } from "react";
import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import vibrator from "vibrator";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function ProgramModal({ show, onHide, program, location }) {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  // const [testMessage, setTestMessage] = useState();

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Title className="text-center display-4 mt-2">
        {program.name}
      </Modal.Title>
      <Modal.Body>
        <Stack gap={2}>
          <Button
            onClick={() => {
              navigate(`/edit-program/${program.id}`);
              vibrator(1);
            }}
          >
            Edit
          </Button>
          {/* <Button
            onClick={() => setTestMessage(`This will COPY ${program.name}`)}
            variant="secondary"
          >
            Copy
          </Button> */}
          {location === "home" && (
            <Button
              onClick={() => {
                dispatch({ type: "remove-program", payload: program });
                vibrator(1);
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
