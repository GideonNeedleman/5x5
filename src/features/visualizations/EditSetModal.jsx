import { Stack } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useGlobalContext } from "../../context/GlobalContext";

function EditSetModal({ show, onHide, set }) {
  const { programData } = useGlobalContext();

  // super nested search. First part digs to find the matching program, then again to find matching workout, then again to find matching exercise.
  const exerciseMatch = programData
    .find((program) =>
      program.workouts.find((workout) =>
        workout.exercises.find((exercise) => exercise.id === set.exerciseId)
      )
    )
    .workouts.find((workout) =>
      workout.exercises.find((exercise) => exercise.id === set.exerciseId)
    )
    .exercises.find((exercise) => exercise.id === set.exerciseId);
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
              <input
                defaultValue={metric.value}
                type={
                  exerciseMatch.metrics.find(
                    (exMetric) => exMetric.name === metric.name
                  ).type
                }
              />
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
