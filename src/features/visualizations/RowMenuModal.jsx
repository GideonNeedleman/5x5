import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function RowMenuModal({ isShowNote, onShowNote, show, onHide }) {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Stack gap={2}>
          <Button variant="warning">Edit set</Button>
          <Button variant="danger">Delete set</Button>
          {!isShowNote && (
            <Button
              onClick={() => {
                onShowNote();
                onHide();
              }}
            >
              Show note
            </Button>
          )}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default RowMenuModal;
