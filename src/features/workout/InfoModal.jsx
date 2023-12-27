import Modal from "react-bootstrap/Modal";

export default function InfoModal({ show, onHide, exercise }) {
  const hasDescription = exercise.description ? "true" : false;
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Title className="text-center mt-3" as={"h3"}>
        Exercise Info
      </Modal.Title>
      <Modal.Body>
        {hasDescription
          ? exercise.description
          : "Sorry, no exercise description available"}
        <h3 className="text-center mt-2">Metric Info</h3>
        <ul className="list-group list-group-flush">
          {exercise.metrics.map((metric, index) => (
            <li key={index} className="list-group-item">
              <span className="text-capitalize">
                {metric.name}:
                {metric.adaptive ? (
                  <span> adaptive</span>
                ) : (
                  <span> not adaptive</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Modal.Body>
      {/*       <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
