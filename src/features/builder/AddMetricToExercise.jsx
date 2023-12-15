import { useEffect } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
import ChooseInputBar from "../input-bars/ChooseInputBar";
import InputBarOptions from "./InputBarOptions";

function AddMetricToExercise({
  register,
  setValue,
  getValues,
  resetField,
  watch,
  index,
}) {
  const inputBarType = watch(`metric-${index}-inputBar`);

  // resets fields to default to avoid bug where values are retained from previously deleted metric.
  useEffect(() => {
    resetField(`metric-${index}-name`);
    resetField(`metric-${index}-units`);
    resetField(`metric-${index}-inputBar`, { defaultValue: "none" });
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
        <p className="fst-italic text-center mb-2">What are you tracking?</p>

        {/* Metric Name */}
        <Form.Group>
          <InputGroup>
            <InputGroup.Text>Metric</InputGroup.Text>
            <Form.Control
              type="text"
              list="metricNameOptions"
              placeholder="Type of Metric"
              {...register(`metric-${index}-name`)}
            />
            <datalist id="metricNameOptions">
              <option value="reps" />
              <option value="weight" />
            </datalist>
          </InputGroup>
        </Form.Group>

        {/* Select Input Bar */}
        <Form.Group className="mt-3">
          <InputGroup>
            <InputGroup.Text className="">Input Bar</InputGroup.Text>
            <Form.Select className="" {...register(`metric-${index}-inputBar`)}>
              <option value="none">Select Input Bar</option>
              <option value="NumberIncrementBar">Number Increment</option>
              {/* <option value="CountdownTimer">Countdown Timer</option> */}
            </Form.Select>
          </InputGroup>
        </Form.Group>

        {/* Options to Setup Input Bar */}
        <InputBarOptions
          inputBarType={inputBarType}
          register={register}
          index={index}
          watch={watch}
          metricName={watch(`metric-${index}-name`)}
        >
          {/* Display Input Bar */}
          {inputBarType !== "none" && (
            <Card className="mt-2" style={{ backgroundColor: "#0d6efd33" }}>
              <Card.Body className="p-2">
                <ChooseInputBar
                  metric={{
                    name: watch(`metric-${index}-name`),
                    step: watch(`metric-${index}-step`),
                  }}
                  inputBar={inputBarType}
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  resetField={resetField}
                  units={watch(`metric-${index}-units`)}
                  placeholder="set default value"
                  fieldname={`metric-${index}-default`}
                />
              </Card.Body>
            </Card>
          )}
        </InputBarOptions>
      </Card.Body>
    </Card>
  );
}

export default AddMetricToExercise;
