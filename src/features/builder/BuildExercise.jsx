import {
  Button,
  Container,
  Form,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { useHookFormMask } from "use-mask-input";
import { useGlobalContext } from "../../context/GlobalContext";
import ExerciseMetric from "./ExerciseMetric";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";

function BuildExercise() {
  const { dispatch, exerciseData } = useGlobalContext();
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = form;
  const registerWithMask = useHookFormMask(register);
  const [numMetrics, setNumMetrics] = useState(0);
  const arrayToMap = Array(numMetrics);

  function handleSubmitExercise(data) {
    // format data into correct exercise shape
    // dispatch newExercise into exerciseData object
    // navigate away
    console.log(data);
  }
  console.log("errors", errors);
  return (
    <main>
      <h1 className="text-center display-3">New Exercise</h1>
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitExercise)}>
          <Form.Group controlId="exerciseName">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exercise name"
              {...register("name")}
            />
          </Form.Group>

          <Form.Group controlId="restTimer" className="mt-3">
            <Form.Label>Rest Timer</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="0:00"
                inputMode="numeric"
                {...registerWithMask("restTimer", ["9:99", "99:99"], {
                  required: false,
                  pattern: {
                    value: /^([0-9]?[0-9]?):?[0-5][0-9]$/g,
                    message: "Seconds digits must be '00' to '59'",
                  },
                })}
              />

              {/* {errors.restTimer && <p>seconds should be less than 60</p>} */}
              {/* <Form.Control.Feedback>
                  Seconds should be less than 60
                </Form.Control.Feedback> */}
            </InputGroup>
            <Form.Text>
              <p className="mb-0 mt-1">min : sec</p>
              Leave blank for no rest timer
            </Form.Text>
            <ErrorMessage
              errors={errors}
              name="restTimer"
              render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
              )}
            />
          </Form.Group>

          {[...arrayToMap].map((metric, index) => (
            <ExerciseMetric register={register} index={index + 1} key={index} />
          ))}

          <div className="d-flex gap-3 my-3">
            {numMetrics > 0 && (
              <Button
                className="mt-3 w-100"
                variant="secondary"
                onClick={() => {
                  setNumMetrics((prev) => prev - 1);
                  vibrator(1);
                }}
              >
                - Remove Metric
              </Button>
            )}
            <Button
              className="mt-3 w-100"
              variant="secondary"
              onClick={() => {
                setNumMetrics((prev) => prev + 1);
                vibrator(1);
              }}
            >
              + Add Metric
            </Button>
          </div>
          <div className="d-flex gap-3 my-3">
            <Button
              variant="warning"
              className="flex-grow-1 w-100 "
              onClick={() => {
                navigate(-1);
                vibrator(1);
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-grow-1 w-100"
              onClick={() => vibrator(1)}
              type="submit"
            >
              Save Exercise
            </Button>
          </div>
        </Form>
        <DevTool control={control} />
      </Container>
    </main>
  );
}

export default BuildExercise;

/* name: "Barbell Squats",
    id: 1,
    restTimer: 90,
    metrics: [
      {
        name: "weight",
        type: "number",
        adaptive: true,
        inputBar: { type: "NumberIncrementBar", step: 5 },
      },
      {
        name: "reps",
        type: "number",
        adaptive: true,
        inputBar: { type: "NumberIncrementBar", step: 1 },
      },
    ], */
