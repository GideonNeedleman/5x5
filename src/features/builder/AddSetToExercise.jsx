import { Card } from "react-bootstrap";
import NumberIncrementBar from "../input-bars/NumberIncrementBar";

function AddSetToExercise({
  register,
  setIndex,
  metrics,
  setValue,
  getValues,
  resetField,
  exerciseId,
}) {
  return (
    <Card border="secondary" className="p-0">
      <Card.Header className="fw-semibold fs-5 text-center p-1">
        Set {setIndex + 1}
      </Card.Header>
      <Card.Body className="pt-2">
        {metrics.map((metric, index) => (
          <NumberIncrementBar
            register={register}
            metric={metric}
            defaultValue={metric.default}
            setValue={setValue}
            getValues={getValues}
            resetField={resetField}
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
