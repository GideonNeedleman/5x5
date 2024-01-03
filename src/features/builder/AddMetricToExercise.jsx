import { useEffect } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
// import ChooseInputBar from "../input-bars/ChooseInputBar";
// import InputBarOptions from "./InputBarOptions";
import ChooseBuildInputBar from "../input-bars/ChooseBuildInputBar";

function AddMetricToExercise({
  register,
  setValue,
  getValues,
  resetField,
  watch,
  index,
  defaultValue,
}) {
  const inputBarType = watch(`metric-${index}-inputBar`);

  // resets fields to default to avoid bug where values are retained from previously deleted metric.
  useEffect(() => {
    resetField(`metric-${index}-name`);
    resetField(`metric-${index}-units`);
    resetField(`metric-${index}-inputBar`, {
      defaultValue: "NumberIncrementBar",
    });
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
        {/* Select Input Bar */}
        <Form.Group className="mt-1">
          <InputGroup>
            <Form.Select
              className="text-center"
              {...register(`metric-${index}-inputBar`)}
            >
              <option value="NumberIncrementBar">Number Increment Bar</option>
              {/* <option value="none">Select Input Bar</option> */}
              {/* <option value="CountdownTimer">Countdown Timer</option> */}
            </Form.Select>
          </InputGroup>
        </Form.Group>

        {/* Display Input Bar */}

        <ChooseBuildInputBar
          index={index}
          inputBar={inputBarType}
          register={register}
          setValue={setValue}
          getValues={getValues}
          resetField={resetField}
          watch={watch}
          defaultValue={defaultValue}
        />
      </Card.Body>
    </Card>
  );
}

export default AddMetricToExercise;
