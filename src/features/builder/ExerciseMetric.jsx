import { Card, Form, InputGroup } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import vibrator from "vibrator";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ExerciseMetric({ register, index }) {
  const Popup = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );

  return (
    <Card border="primary" className="mt-3">
      <Card.Body>
        <Card.Title>Metric {index}</Card.Title>
        <p className="fst-italic text-center">
          How are you measuring this exercise?
        </p>
        <Form.Group>
          <Form.Label>Metric Name</Form.Label>
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
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Units</Form.Label>
          <Form.Control
            type="text"
            list="metricUnitOptions"
            placeholder="Units"
            {...register(`metric-${index}-units`)}
          />
          <datalist id="metricUnitOptions">
            <option value="kg" />
            <option value="lbs" />
          </datalist>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Input Bar Type</Form.Label>
          <InputGroup>
            <Form.Select {...register(`metric-${index}-type`)}>
              <option value="NumberIncrementBar">Number Increment</option>
              {/* <option value="CountdownTimer">Countdown Timer</option> */}
            </Form.Select>
          </InputGroup>
        </Form.Group>

        {/* Specify default value? */}

        <Form.Group className="mt-3">
          <Form.Label>Increment Step Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="How much is each increment step?"
            {...register(`metric-${index}-step`, {
              valueAsNumber: true,
              min: 0,
            })}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Default Value</Form.Label>
          <Form.Control
            type="number"
            placeholder="Metric default"
            {...register(`metric-${index}-default`, {
              valueAsNumber: true,
              min: 0,
            })}
          />
        </Form.Group>

        <div className="d-flex align-items-baseline gap-3 ">
          <Form.Check // prettier-ignore
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

export default ExerciseMetric;

{
  /* <option value="increment">
  <NumberIncrementBar metric={{ name: "thing" }} register={register} />
</option>; */
}
