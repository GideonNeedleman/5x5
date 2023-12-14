import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { useHookFormMask } from "use-mask-input";
import { useGlobalContext } from "../../context/GlobalContext";
import ExerciseMetric from "./ExerciseMetric";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { timeToSeconds } from "../../utils/helpers";
import SubmitButtonBar from "../../components/SubmitButtonBar";

function BuildExercise() {
  const { dispatch, exerciseData } = useGlobalContext();
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    // setValue,
    // getValues,
    resetField,
    formState: { errors },
  } = form;
  const registerWithMask = useHookFormMask(register);
  const [numMetrics, setNumMetrics] = useState(0);
  const arrayToMap = [...Array(numMetrics)];

  function handleSubmitExercise(data) {
    // format data into correct exercise shape
    // dispatch newExercise into exerciseData object
    // navigate away
    const id = exerciseData.length + 1;
    const { name, restTimer, ...metricsObject } = data;

    // 1) count number of metrics
    const keys = Object.keys(metricsObject);
    let numMetrics = 0;
    let i = 1;
    if (keys.length > 0) {
      //guardian at least 1 metric
      while (i > 0) {
        if (keys.some((el) => el.includes(`metric-${i}-`))) {
          numMetrics++;
        } else {
          break;
        }
        i++;
      }
    }

    // 2) loop over numMetrics, adding object to array containing all properties that match 'metric-i-' and remove that prefix
    let metricsArray = [];
    for (let i = 1; i <= numMetrics; i++) {
      const newMetric = {};
      const prefixLength = 8 + i.toString().length;
      for (const property in metricsObject) {
        if (property.includes(`metric-${i}-`))
          newMetric[property.substring(prefixLength)] = metricsObject[property];
      }
      metricsArray = [...metricsArray, newMetric];
    }

    const restTimerSeconds = timeToSeconds(restTimer);

    // final formatted exercise object
    const exerciseObject = {
      id,
      name,
      restTimer: restTimerSeconds,
      metrics: metricsArray,
    };

    dispatch({ type: "add-new-exercise", payload: exerciseObject });
    navigate(-1);
  }

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
              autoFocus
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
            </InputGroup>
            <Form.Text>
              <p className="mb-0 mt-1">min : sec</p>
              Leave blank for no rest timer
            </Form.Text>
            <ErrorMessage
              errors={errors}
              name="restTimer"
              render={({ message }) => (
                <p style={{ color: "var(--bs-danger)" }}>{message}</p>
              )}
            />
          </Form.Group>

          {arrayToMap.map((metric, index) => (
            <ExerciseMetric
              register={register}
              resetField={resetField}
              index={index + 1}
              key={index}
            />
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
                &minus; Remove Metric
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

          <SubmitButtonBar>Save Exercise</SubmitButtonBar>
        </Form>
        <DevTool control={control} />
      </Container>
    </main>
  );
}

export default BuildExercise;
