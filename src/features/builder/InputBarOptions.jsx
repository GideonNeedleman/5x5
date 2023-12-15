import { Form, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  BsInfoCircleFill,
  BsArrow90DegUp,
  BsArrow90DegDown,
  BsPlusSlashMinus,
} from "react-icons/bs";
import { IconContext } from "react-icons";
import vibrator from "vibrator";

function InputBarOptions({ inputBarType, register, index, watch, children }) {
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
          </details>
          {/* Display default value as summary */}
          {/* {!isNaN(watch(`metric-${index}-default`)) && (
            <p className="text-center mt-3 fst-italic bg-info-subtle rounded">
              Default Value: {watch(`metric-${index}-default`)}{" "}
              {watch(`metric-${index}-units`)}
            </p>
          )} */}
        </>
      );
    default:
      return <p>{/* No matching input bar */}</p>;
  }
}

export default InputBarOptions;
