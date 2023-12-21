import { useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import vibrator from "vibrator";

// not including units. Could try pass in metric then get metric.name and metric.inputBar.step

function BuildNumberIncrementBar({
  index,
  register,
  setValue,
  getValues,
  resetField, // used to fix deleted field state bug
  isFinished = false,
  isUnlocked = true,
  defaultValue,
  watch,
}) {
  const fieldName = `metric-${index}`;

  function stepMetric(metricToStep, step) {
    if (isNaN(getValues(metricToStep))) {
      setValue(metricToStep, step);
      return;
    }

    setValue(metricToStep, Number(getValues(metricToStep)) + step);
  }

  /*   useEffect(() => {
    resetField(fieldName, { defaultValue });
  }, [resetField, fieldName, defaultValue]); */

  return (
    <>
      <div className="text-center mb-2 d-flex gap-2 justify-content-center">
        <input
          className="text-capitalize text-center fw-semibold m-0"
          {...register(`${fieldName}-name`)}
          placeholder="metric name"
          style={{ maxWidth: "50%" }}
        />

        <input
          className="fw-normal fst-italic text-center"
          placeholder="optional units"
          style={{ maxWidth: "40%" }}
          type="text"
          list="metricUnitOptions"
          {...register(`${fieldName}-units`)}
        />
        <datalist id="metricUnitOptions">
          <option value="kg" />
          <option value="lbs" />
        </datalist>
      </div>
      <InputGroup className="mb-4 pb-2">
        <Button
          variant="secondary"
          disabled={isFinished && !isUnlocked}
          onClick={() => {
            stepMetric(
              `${fieldName}-metric`,
              -watch(`${fieldName}-step`) || -1
            );
            vibrator(1);
          }}
        >
          <BsDashLg />
        </Button>
        <Form.Control
          className="text-center"
          type="number"
          step="any"
          {...register(`${fieldName}-metric`, {
            valueAsNumber: true,
          })}
          defaultValue={defaultValue}
          placeholder="Default Value"
          disabled={isFinished && !isUnlocked}
        />
        <Button
          variant="secondary"
          disabled={isFinished && !isUnlocked}
          onClick={() => {
            stepMetric(`${fieldName}-metric`, watch(`${fieldName}-step`) || 1);
            vibrator(1);
          }}
        >
          <BsPlusLg />
        </Button>
      </InputGroup>
      <input
        className="mt-2 text-center"
        placeholder="Step"
        style={{
          maxWidth: "15%",
          position: "absolute",
          right: "0.5rem",
          bottom: "0.25rem",
        }}
        {...register(`${fieldName}-step`, {
          valueAsNumber: true,
          min: 0,
        })}
      />
    </>
  );
}

export default BuildNumberIncrementBar;
