import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useGlobalContext } from "../../context/GlobalContext";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function EditSetModal({ show, onHide, set }) {
  const { programData } = useGlobalContext();
  const form = useForm();
  const { register, control, handleSubmit } = form;

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

  function handleSubmitSet(data) {
    /* const { note, ...newMetrics } = data;
    const newSetData = {
      ...set.exerciseId,
      ...set.exerciseName,
      ...set.datetime,
      ...data.note,
      metrics: [newMetrics],
    }; */

    // const newSetData = { ...set, note, ...newMetrics };
    const { note, ...newMetrics } = data;
    const newSet = { ...set, note };
    console.log("data", data);
    console.log("new set", newSet);
    console.log(newMetrics);
    // I need to convert {weight: '1800', reps: '10'} into [{name: 'weight', value: 1800},{name: 'reps', value: 10}]
  }
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2 className="text-center">Edit {set.exerciseName}</h2>
        <Form onSubmit={handleSubmit(handleSubmitSet)}>
          {set.metrics.map((metric) => (
            <>
              <Form.Label
                className="text-capitalize"
                htmlFor={metric.name}
                // key={`label-${metric.name}`}
              >
                {metric.name}
              </Form.Label>
              <InputGroup className="mb-2" key={metric.name}>
                <Form.Control
                  id={metric.name}
                  className="text-center"
                  type={
                    exerciseMatch.metrics.find(
                      (exMetric) => exMetric.name === metric.name
                    ).type
                  }
                  defaultValue={metric.value}
                  {...register(metric.name)}
                />
              </InputGroup>
            </>
          ))}
          <Form.Label htmlFor="note">Note</Form.Label>
          <InputGroup>
            <Form.Control
              className="mb-3"
              id="note"
              as="textarea"
              placeholder="Write notes here..."
              aria-label="With textarea"
              defaultValue={set.note}
              {...register("note")}
            />
          </InputGroup>
          <div className="text-end">
            <Button className="me-2" variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
        <DevTool control={control} />
      </Modal.Body>
    </Modal>
  );
}

export default EditSetModal;
