import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import vibrator from "vibrator";

function RowMenuModal({
  show,
  onHide,
  setIsShowEditModal,
  setIsShowConfirmationModal,
}) {
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
          <Button
            variant="warning"
            onClick={() => {
              setIsShowEditModal(true);
              onHide();
              vibrator(1);
            }}
          >
            Edit record
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setIsShowConfirmationModal(true);
              onHide();
              vibrator(1);
            }}
          >
            Delete record
          </Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default RowMenuModal;
