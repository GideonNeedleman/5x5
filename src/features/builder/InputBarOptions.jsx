import {
  Card,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  BsInfoCircleFill,
  BsArrow90DegUp,
  BsArrow90DegDown,
  BsPlusSlashMinus,
} from "react-icons/bs";
import { IconContext } from "react-icons";
import vibrator from "vibrator";

function InputBarOptions({
  inputBarType,
  register,
  index,
  watch,
  metricName,
  children,
}) {
  const Popup = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <a href="#">{children}</a>
    </OverlayTrigger>
  );

  switch (inputBarType) {
    case "NumberIncrementBar":
      return (
        <>
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
          <div className="d-flex justify-content-between mt-3">
            <span className=" font-monospace mt-3">
              &nbsp; &nbsp;
              <BsArrow90DegDown />
              {/* &nbsp;-
              {watch(`metric-${index}-step`)} */}
            </span>
            <Form.Group className="w-50">
              <InputGroup>
                <InputGroup.Text>
                  <BsPlusSlashMinus />
                </InputGroup.Text>
                <Form.Control
                  type="number"
                  step="any"
                  defaultValue="1"
                  className="text-center"
                  placeholder="step size"
                  {...register(`metric-${index}-step`, {
                    valueAsNumber: true,
                    min: 0,
                  })}
                />
              </InputGroup>
            </Form.Group>
            <span className="font-monospace mt-3">
              <BsArrow90DegUp style={{ rotate: "180deg" }} />
              &nbsp; &nbsp;
            </span>
          </div>
          {children}
          <details className="mt-2">
            <summary>Advanced options</summary>
            <div className="d-flex align-items-baseline gap-3 ">
              <Form.Check
                type="switch"
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
          </details>
          {/* Display default value as summary */}
          {!isNaN(watch(`metric-${index}-default`)) && (
            <Card border="secondary" className="text-center mt-2">
              <Card.Header className="p-1">Summary</Card.Header>
              <Card.Body className="fst-italic p-1">
                <p className="mb-0">
                  <span className="text-capitalize">{metricName} </span>
                  default: {watch(`metric-${index}-default`)}{" "}
                  {watch(`metric-${index}-units`)}
                </p>
                {!isNaN(watch(`metric-${index}-step`)) && (
                  <p className="mb-0">
                    Step value: {watch(`metric-${index}-step`)}
                  </p>
                )}
              </Card.Body>
            </Card>
          )}
        </>
      );
    default:
      return <p>{/* No matching input bar */}</p>;
  }
}

export default InputBarOptions;
