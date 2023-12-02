import { Stack } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function EditSetModal({ show, onHide, set }) {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {/* <Stack gap={2}> */}
        <h2 className="text-center">Edit {set.exerciseName}</h2>
        <Form>
          {set.metrics.map((metric) => (
            <label key={metric.name}>
              {metric.name}
              <input defaultValue={metric.value} type="number" />
            </label>
          ))}
          <label>
            note
            <input defaultValue={set.note} />
          </label>
        </Form>
        {/* </Stack> */}
      </Modal.Body>
    </Modal>
  );
}

export default EditSetModal;
