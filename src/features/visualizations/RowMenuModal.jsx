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
      </Modal.Body>
    </Modal>
  );
}

export default RowMenuModal;
