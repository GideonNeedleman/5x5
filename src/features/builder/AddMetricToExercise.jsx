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
        <p className="fst-italic text-center ">What are you tracking?</p>
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

        <Form.Group className="mt-3">
          <p className="text-center fw-bold m-1">Input Bar</p>
          <Form.Select
            className="mb-2 text-center"
            {...register(`metric-${index}-inputBar`)}
          >
            <option value="none">Select Input Bar</option>
            <option value="NumberIncrementBar">Number Increment</option>
            {/* <option value="CountdownTimer">Countdown Timer</option> */}
          </Form.Select>
        </Form.Group>

        {/* Display inputBar here */}

        {inputBarType !== "none" && (
          <>
            <hr className="text-primary" />
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
          </>
        )}

        <InputBarOptions
          inputBarType={inputBarType}
          register={register}
          index={index}
          watch={watch}
        />
      </Card.Body>
    </Card>
  );
}

export default AddMetricToExercise;
