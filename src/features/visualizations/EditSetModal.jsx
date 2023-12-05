import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import { useGlobalContext } from "../../context/GlobalContext";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import vibrator from "vibrator";
import SetBody from "../workout/SetBody";
import SetNote from "../workout/SetNote";

function EditSetModal({ show, onHide, set, exercise }) {
  const { dispatch } = useGlobalContext();
  const form = useForm();
  const { register, control, handleSubmit, setValue, getValues } = form;

  console.log("set", set);
  console.log("exercise", exercise);

  function handleSubmitSet(data) {
    console.log("data", data);
    const { note, ...editedMetrics } = data;
    const editedSet = { ...set, note, metrics: editedMetrics };
    console.log("editedSet", editedSet);
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
          <SetBody
            set={set}
            exercise={exercise}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
          {/* Field for note */}
          <Form.Label htmlFor="note">Note</Form.Label>
          <SetNote register={register} defaultValue={set.note} />
          {/* <InputGroup>
            <Form.Control
              className="mb-3"
              id="note"
              as="textarea"
              placeholder="Write notes here..."
              aria-label="With textarea"
              defaultValue={set.note}
              {...register("note")}
            />
          </InputGroup> */}
          <div className="text-end mt-3">
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
