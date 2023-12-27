import { Card, ListGroup } from "react-bootstrap";
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
      <Card border="primary">
        <Card.Header className="text-center" as={"h3"}>
          Exercise Info
        </Card.Header>
        <Card.Body>
          {hasDescription
            ? exercise.description
            : "Sorry, no exercise description available"}
        </Card.Body>
        <Card.Header className="text-center mt-2" as="h3">
          Metric Info
        </Card.Header>
        <Card.Body className="p-0">
          <ListGroup variant="flush" className="">
            {exercise.metrics.map((metric, index) => (
              <ListGroup.Item key={index} className="">
                <span className="text-capitalize">
                  {metric.name}:
                  {metric.adaptive ? (
                    <span> adaptive</span>
                  ) : (
                    <span> not adaptive</span>
                  )}
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Modal>
  );
}
