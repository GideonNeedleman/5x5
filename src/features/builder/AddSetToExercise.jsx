import { Card, Form } from "react-bootstrap";
import NumberIncrementBar from "../input-bars/NumberIncrementBar";

function AddSetToExercise({
  register,
  setIndex,
  metrics,
  setValue,
  getValues,
  exerciseId,
}) {
  return (
    <Card border="secondary">
      <p className="mt-1 mb-0 text-center fs-4">Set {setIndex + 1} </p>
      <Card.Body>
        {metrics.map((metric, index) => (
          <NumberIncrementBar
            register={register}
            metric={metric}
            defaultValue={metric.default}
            setValue={setValue}
            getValues={getValues}
            fieldName={`exercise-${exerciseId}-set-${setIndex + 1}-${
              metric.name
            }`}
            key={index}
          />
        ))}
      </Card.Body>
    </Card>
  );
}

export default AddSetToExercise;

{
  /* <span key={index}>
            {metric.name}:
            <Form.Control defaultValue={metric.default} />
          </span> */
}
