import { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import vibrator from "vibrator";

// not including units. Could try pass in metric then get metric.name and metric.inputBar.step

function NumberIncrementBar({
  metric,
  register,
  setValue,
  getValues,
  resetField, // used to fix deleted field state bug
  isFinished = false,
  isUnlocked = true,
  defaultValue,
  fieldName = metric.name,
  units,
  placeholder,
}) {
  function stepMetric(metricToStep, step) {
    if (isNaN(getValues(metricToStep))) {
      setValue(metricToStep, 0);
      return;
    }

    setValue(metricToStep, Number(getValues(metricToStep)) + step);
  }

  useEffect(() => {
    resetField(fieldName, { defaultValue });
  }, [resetField, fieldName, defaultValue]);

  return (
    <>
      <div className="text-center">
        <span className="text-capitalize fw-semibold m-0">{metric.name}</span>
        <span className="fw-normal fst-italic">{units && ` - ${units}`}</span>
      </div>
      <InputGroup className="mb-1">
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
          step="any"
          {...register(fieldName, {
            valueAsNumber: true,
          })}
          defaultValue={defaultValue}
          placeholder={placeholder}
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
