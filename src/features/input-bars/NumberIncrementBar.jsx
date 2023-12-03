import { Button, Form, InputGroup } from "react-bootstrap";
import { BsDashLg, BsPlusLg } from "react-icons/bs";

// not including units. Could try pass in metric then get metric.name and metric.inputBar.step

function NumberIncrementBar({
  metric,
  register,
  setValue,
  getValues,
  isFinished = false,
  isUnlocked = true,
  defaultValue,
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
          onClick={() => stepMetric(metric.name, -metric.inputBar.step)}
        >
          <BsDashLg />
        </Button>
        <Form.Control
          className="text-center"
          type="number"
          {...register(metric.name, {
            valueAsNumber: true,
          })}
          aria-label={metric.name}
          defaultValue={defaultValue}
          disabled={isFinished && !isUnlocked}
        />
        <Button
          variant="secondary"
          disabled={isFinished && !isUnlocked}
          onClick={() => stepMetric(metric.name, metric.inputBar.step)}
        >
          <BsPlusLg />
        </Button>
      </InputGroup>
    </>
  );
}

export default NumberIncrementBar;
