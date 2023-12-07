import Modal from "react-bootstrap/Modal";

export default function InfoModal({ show, onHide, info }) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Title className="text-center">Info Box</Modal.Title>
      <Modal.Body>Information will go here</Modal.Body>
      {/*       <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
