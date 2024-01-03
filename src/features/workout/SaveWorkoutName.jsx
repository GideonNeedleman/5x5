import { Form } from "react-bootstrap";

function SaveWorkoutName({ workoutName, setWorkoutName }) {
  return (
    <Form.Group className="px-2 mt-2 pt-1 pb-2 bg-warning-subtle">
      <Form.Label className="mb-1 ms-1 fst-italic" htmlFor="workoutName">
        Enter name to save workout for future use
      </Form.Label>
      <Form.Control
        type="text"
        id="workoutName"
        placeholder="Workout name"
        className=""
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
    </Form.Group>
  );
}

export default SaveWorkoutName;
