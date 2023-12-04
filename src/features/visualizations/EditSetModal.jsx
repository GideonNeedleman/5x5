import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useGlobalContext } from "../../context/GlobalContext";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { objectToArray } from "../../utils/helpers";
import NumberIncrementBar from "../input-bars/NumberIncrementBar";
import vibrator from "vibrator";

function EditSetModal({ show, onHide, set }) {
  const { programData, dispatch } = useGlobalContext();
  const form = useForm();
  const { register, control, handleSubmit, setValue, getValues } = form;

  // super nested search. First part digs to find the matching program, then again to find matching workout, then again to find matching exercise. Should be better way
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
    const { note, ...editedMetrics } = data;
    const metricsArray = objectToArray(editedMetrics);
    const editedSet = { ...set, note, metrics: metricsArray };
    dispatch({ type: "edit-set-data", payload: editedSet });
    onHide();
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
          {/* There's no step value because set shape in workoutData !== set shape in programData. Cludge in fallback stepvalue inside NumberIncrementBar. Ideally slot in SetBody here with switch statement to find correct inputBar. Need to align object shapes to make it work. */}
          {set.metrics.map((metric) => (
            <NumberIncrementBar
              metric={metric}
              register={register}
              setValue={setValue}
              getValues={getValues}
              defaultValue={metric.value}
              key={metric.name}
            />
          ))}
          {/* Field for note */}
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
            <Button
              className="me-2"
              variant="secondary"
              onClick={() => {
                onHide();
                vibrator(1);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={() => vibrator(1)}>
              Save
            </Button>
          </div>
        </Form>
        <DevTool control={control} />
      </Modal.Body>
    </Modal>
  );
}

export default EditSetModal;
