import { useEffect } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { IconContext } from "react-icons";
import { BsDashLg, BsInfoCircleFill, BsPlusLg } from "react-icons/bs";
import vibrator from "vibrator";

// not including units. Could try pass in metric then get metric.name and metric.inputBar.step

function BuildNumberIncrementBar({
  index,
  register,
  setValue,
  getValues,
  resetField, // used to fix deleted field state bug
  // isFinished = false,
  // isUnlocked = true,
  defaultValue,
  watch,
  edit,
  inputBar,
}) {
  const fieldName = `metric-${index}`;

  function stepMetric(metricToStep, step) {
    if (isNaN(getValues(metricToStep))) {
      setValue(metricToStep, step);
      return;
    }

    setValue(metricToStep, Number(getValues(metricToStep)) + step);
  }

  const Popup = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );
  useEffect(() => {
    resetField(`${fieldName}-name`, { defaultValue: defaultValue?.name });
    resetField(`${fieldName}-units`, { defaultValue: defaultValue?.units });
    edit && resetField(`${fieldName}-inputBar`, { defaultValue: inputBar });
  }, [resetField, fieldName, defaultValue, edit, inputBar]);

  return (
    <>
      <Card
        className="mt-2 border-light"
        style={{
          backgroundColor: "#0d6efd33",
        }}
      >
        <Card.Body className="p-2">
          <div className="text-center mb-2 d-flex gap-2 justify-content-center">
            <input
              className="text-capitalize text-center fw-semibold m-0 border-0 rounded"
              {...register(`${fieldName}-name`)}
              placeholder="metric name"
              required
              style={{ maxWidth: "50%" }}
              defaultValue={defaultValue?.name}
              disabled={edit}
            />

            <input
              className="fw-normal fst-italic text-center border-0 rounded"
              placeholder="optional units"
              style={{ maxWidth: "40%" }}
              type="text"
              list="metricUnitOptions"
              {...register(`${fieldName}-units`)}
              defaultValue={defaultValue?.units}
              disabled={edit}
            />
            <datalist id="metricUnitOptions">
              <option value="kg" />
              <option value="lbs" />
            </datalist>
          </div>
          <InputGroup className="">
            <Button
              variant="secondary"
              // disabled={isFinished && !isUnlocked}
              onClick={() => {
                stepMetric(
                  `${fieldName}-default`,
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
              {...register(`${fieldName}-default`, {
                valueAsNumber: true,
              })}
              placeholder="Default Value"
              defaultValue={defaultValue?.default}
              // disabled={isFinished && !isUnlocked}
            />
            <Button
              variant="secondary"
              // disabled={isFinished && !isUnlocked}
              onClick={() => {
                stepMetric(
                  `${fieldName}-default`,
                  watch(`${fieldName}-step`) || 1
                );
                vibrator(1);
              }}
            >
              <BsPlusLg />
            </Button>
          </InputGroup>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <span className="mt-2">+/&minus; buttons step amount:</span>
            <input
              className="mt-2 text-center border-0 rounded fst-italic"
              placeholder="step"
              style={{
                maxWidth: "15%",
              }}
              {...register(`${fieldName}-step`, {
                valueAsNumber: true,
                min: 0,
              })}
              defaultValue={defaultValue?.step}
            />
          </div>
          {/* Advanced Options */}
        </Card.Body>
      </Card>
      <details className="mt-2">
        <summary>Advanced options</summary>
        <div className="d-flex align-items-baseline gap-2 mb-2">
          <Form.Check
            type="switch"
            label="Adaptive Metric"
            className="mt-3"
            onClick={() => vibrator(1)}
            {...register(`${fieldName}-adaptive`)}
            defaultChecked={defaultValue?.adaptive}
          />
          <Popup title="Default values will change to match your last entered value">
            <IconContext.Provider value={{ color: "var(--bs-primary)" }}>
              <BsInfoCircleFill />
            </IconContext.Provider>
          </Popup>
        </div>
        <Form.Check
          {...register(`${fieldName}-better`)}
          name={`${fieldName}-better`}
          type="radio"
          value="bigger"
          label="Bigger is better"
          defaultChecked={defaultValue?.better === "bigger" || !defaultValue}
        />
        <Form.Check
          {...register(`${fieldName}-better`)}
          name={`${fieldName}-better`}
          type="radio"
          value="smaller"
          label="Smaller is better"
          defaultChecked={defaultValue?.better === "smaller"}
        />
      </details>
      <input
        {...register(`${fieldName}-inputBar`)}
        defaultValue={inputBar}
        hidden
      />
    </>
  );
}

export default BuildNumberIncrementBar;
