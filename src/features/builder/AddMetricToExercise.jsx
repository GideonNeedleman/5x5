import { useEffect } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import vibrator from "vibrator";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function AddMetricToExercise({ register, resetField, index }) {
  const Popup = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );

  // resets fields to default to avoid bug where values are retained from previously deleted metric. Will need to redo a bit for additional inputBar options.
  useEffect(() => {
    resetField(`metric-${index}-name`);
    resetField(`metric-${index}-units`);
    // resetField(`metric-${index}-inputBar`);
    resetField(`metric-${index}-step`);
    resetField(`metric-${index}-default`);
    resetField(`metric-${index}-adaptive`);
  }, [resetField, index]);

  return (
    <Card border="primary" className="mt-3 ">
      <Card.Header className="fw-semibold fs-5 text-center p-1">
        Metric {index}
      </Card.Header>
      <Card.Body className="pt-1">
        <p className="fst-italic text-center ">
          How are you measuring this exercise?
        </p>
        <Form.Group>
          <InputGroup>
            <InputGroup.Text>Name</InputGroup.Text>
            <Form.Control
              type="text"
              list="metricNameOptions"
              placeholder="Metric name"
              {...register(`metric-${index}-name`)}
            />
            <datalist id="metricNameOptions">
              <option value="reps" />
              <option value="weight" />
            </datalist>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mt-3">
          <InputGroup>
            <InputGroup.Text>Units</InputGroup.Text>
            <Form.Control
              type="text"
              list="metricUnitOptions"
              placeholder="Optional"
              {...register(`metric-${index}-units`)}
            />
            <datalist id="metricUnitOptions">
              <option value="kg" />
              <option value="lbs" />
            </datalist>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Input Bar Type</Form.Label>
          <InputGroup>
            <Form.Select {...register(`metric-${index}-inputBar`)}>
              <option value="NumberIncrementBar">Number Increment</option>
              {/* <option value="CountdownTimer">Countdown Timer</option> */}
            </Form.Select>
          </InputGroup>
        </Form.Group>

        {/* Display inputBar here */}

        <Form.Group className="mt-3">
          <InputGroup>
            <InputGroup.Text>Step</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Increment step size"
              {...register(`metric-${index}-step`, {
                valueAsNumber: true,
                min: 0,
              })}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mt-3">
          <InputGroup>
            <InputGroup.Text>Default Value</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Enter default"
              {...register(`metric-${index}-default`, {
                valueAsNumber: true,
                min: 0,
              })}
            />
          </InputGroup>
        </Form.Group>

        <div className="d-flex align-items-baseline gap-3 ">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Adaptive Metric"
            className="mt-3"
            onClick={() => vibrator(1)}
            {...register(`metric-${index}-adaptive`)}
          />
          <Popup title="Default values will change to match your last entered value">
            <IconContext.Provider value={{ color: "var(--bs-primary)" }}>
              <BsInfoCircleFill />
            </IconContext.Provider>
          </Popup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AddMetricToExercise;
