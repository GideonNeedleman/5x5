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

  const Popup = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );
  /*   useEffect(() => {
    resetField(fieldName, { defaultValue });
  }, [resetField, fieldName, defaultValue]); */

  return (
    <>
      <Card className="mt-2" style={{ backgroundColor: "#0d6efd33" }}>
        <Card.Body className="p-2">
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
          <InputGroup className="">
            <Button
              variant="secondary"
              disabled={isFinished && !isUnlocked}
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
              defaultValue={defaultValue}
              placeholder="Default Value"
              disabled={isFinished && !isUnlocked}
            />
            <Button
              variant="secondary"
              disabled={isFinished && !isUnlocked}
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
            <span>+/&minus; buttons step amount:</span>
            <input
              className="mt-2 text-center"
              placeholder="Step"
              style={{
                maxWidth: "15%",
                /* position: "absolute",
          right: "0.5rem",
          bottom: "0.25rem", */
              }}
              {...register(`${fieldName}-step`, {
                valueAsNumber: true,
                min: 0,
              })}
            />
          </div>
          {/* Advanced Options */}
        </Card.Body>
      </Card>
      <details className="mt-2">
        <summary>Advanced options</summary>
        <div className="d-flex align-items-baseline gap-2 ">
          <Form.Check
            type="switch"
            label="Adaptive Metric"
            className="mt-3"
            onClick={() => vibrator(1)}
            {...register(`${fieldName}-adaptive`)}
          />
          <Popup title="Default values will change to match your last entered value">
            <IconContext.Provider value={{ color: "var(--bs-primary)" }}>
              <BsInfoCircleFill />
            </IconContext.Provider>
          </Popup>
        </div>
      </details>
    </>
  );
}

export default BuildNumberIncrementBar;
