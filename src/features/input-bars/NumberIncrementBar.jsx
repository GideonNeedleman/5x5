import { Button, Form, InputGroup } from "react-bootstrap";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import vibrator from "vibrator";

// not including units. Could try pass in metric then get metric.name and metric.inputBar.step

function NumberIncrementBar({
  metric,
  register,
  setValue,
  getValues,
  isFinished = false,
  isUnlocked = true,
  defaultValue,
  fieldName = metric.name,
}) {
  function stepMetric(metricToStep, step) {
    setValue(metricToStep, Number(getValues(metricToStep)) + step);
  }

  return (
    <>
      <p className="text-center fw-semibold m-0">{metric.name}</p>
      <InputGroup className="mb-2">
        <Button
          variant="secondary"
          disabled={isFinished && !isUnlocked}
          onClick={() => {
            stepMetric(fieldName, -metric.step || -1);
            vibrator(1);
          }}
        >
          <BsDashLg />
        </Button>
        <Form.Control
          className="text-center"
          type="number"
          {...register(fieldName, {
            valueAsNumber: true,
          })}
          defaultValue={defaultValue}
          disabled={isFinished && !isUnlocked}
        />
        <Button
          variant="secondary"
          disabled={isFinished && !isUnlocked}
          onClick={() => {
            stepMetric(fieldName, metric.step || 1);
            vibrator(1);
          }}
        >
          <BsPlusLg />
        </Button>
      </InputGroup>
    </>
  );
}

export default NumberIncrementBar;
