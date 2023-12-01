import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGlobalContext } from "../../context/GlobalContext";
import { useState } from "react";

function RowMenuModal({
  isShowNote,
  onShowNote,
  show,
  onHide,
  set,
  setIsShowEditModal,
}) {
  const { dispatch } = useGlobalContext();
  const [isShowConfirm, setIsShowConfirm] = useState(false);

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
            Edit set
          </Button>
          <Button variant="danger" onClick={() => setIsShowConfirm(true)}>
            Delete set
          </Button>
          {isShowConfirm && (
            <div>
              <p className="text-center">Confirm delete set:</p>
              <div className="text-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => {
                    setIsShowConfirm(false);
                    onHide();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsShowConfirm(false);
                    onHide();
                    dispatch({ type: "delete-set", payload: set });
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
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
