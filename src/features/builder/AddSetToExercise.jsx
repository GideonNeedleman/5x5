import { Form } from "react-bootstrap";

function AddSetToExercise({ setIndex, metrics }) {
  return (
    <div>
      Set {setIndex + 1}:
      {metrics.map((metric, index) => (
        <span key={index}>
          {metric.name}:
          <Form.Control defaultValue={metric.default} />
        </span>
      ))}
    </div>
  );
}

export default AddSetToExercise;
