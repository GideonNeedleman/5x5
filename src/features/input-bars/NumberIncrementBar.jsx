import { Button, Form, InputGroup } from "react-bootstrap";
import { BsDashLg, BsPlusLg } from "react-icons/bs";

function NumberIncrementBar({
  metricName,
  metricStep,
  register,
  setValue,
  getValues,
  isFinished = false,
  isUnlocked = true,
}) {
  function stepMetric(metric, step) {
    setValue(metric, Number(getValues(metric)) + step);
  }

  return (
    <>
      <p className="text-center fw-semibold m-0">{metricName} (lbs)</p>
      <InputGroup className="mb-2">
        <Button
          variant="secondary"
          disabled={isFinished && !isUnlocked}
          onClick={() => stepMetric(metricName, -metricStep)}
        >
          <BsDashLg />
        </Button>
        <Form.Control
          className="text-center"
          type="number"
          {...register(metricName, {
            valueAsNumber: true,
          })}
          aria-label={metricName}
          disabled={isFinished && !isUnlocked}
        />
        <Button
          variant="secondary"
          disabled={isFinished && !isUnlocked}
          onClick={() => stepMetric(metricName, metricStep)}
        >
          <BsPlusLg />
        </Button>
      </InputGroup>
    </>
  );
}

export default NumberIncrementBar;
