import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
            }}
          >
            Edit record
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setIsShowConfirmationModal(true);
              onHide();
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
