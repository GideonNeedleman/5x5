import { Form } from "react-bootstrap";

function SaveWorkoutName({ workoutName, setWorkoutName }) {
  return (
    <Form.Group className="px-2 mt-2 pt-1 pb-2 bg-primary-subtle">
      <Form.Label className="mb-1" htmlFor="workoutName">
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
