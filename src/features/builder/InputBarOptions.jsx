import { Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import vibrator from "vibrator";

function InputBarOptions({ inputBarType, register, index, watch }) {
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
          <Form.Group className="mt-3">
            <InputGroup>
              <InputGroup.Text>Step</InputGroup.Text>
              <Form.Control
                type="number"
                step="any"
                placeholder="Increment step size"
                {...register(`metric-${index}-step`, {
                  valueAsNumber: true,
                  min: 0,
                })}
              />
            </InputGroup>
          </Form.Group>
          {!isNaN(watch(`metric-${index}-default`)) && (
            <p className="text-center mt-3 fst-italic bg-info-subtle rounded">
              Default Value: {watch(`metric-${index}-default`)}{" "}
              {watch(`metric-${index}-units`)}
            </p>
          )}
          <details className="mt-2">
            <summary>Advanced options</summary>
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
          </details>{" "}
        </>
      );
    default:
      return <p>{/* No matching input bar */}</p>;
  }
}

export default InputBarOptions;
