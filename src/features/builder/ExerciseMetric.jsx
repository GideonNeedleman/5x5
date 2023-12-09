import { Card, Form, InputGroup } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ExerciseMetric({ register, index }) {
  const adaptive = "this is a label";

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
            {...register(`metric-name-${index}`)}
          />
          <datalist id="metricNameOptions">
            <option value="reps" />
            <option value="weight" />
          </datalist>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Data Type</Form.Label>
          <InputGroup>
            <Form.Select {...register(`metric-type-${index}`)}>
              <option value="number">Number</option>
              {/* <option value="string">Text</option> */}
            </Form.Select>
          </InputGroup>
        </Form.Group>
        <div className="d-flex align-items-baseline gap-3 ">
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Adaptive Metric"
            className="mt-3"
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
