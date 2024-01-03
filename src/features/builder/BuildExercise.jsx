import { Container, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { useHookFormMask } from "use-mask-input";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { secondsToTime, timeToSeconds } from "../../utils/helpers";
import SubmitButtonBar from "../../components/SubmitButtonBar";
import IncrementButtonBar from "../../components/IncrementButtonBar";
import AddMetricToExercise from "./AddMetricToExercise";
import ChooseBuildInputBar from "../input-bars/ChooseBuildInputBar";

function BuildExercise({
  edit = false,
  exerciseToEdit,
  onHide,
  defaultSetup,
  workoutInProgress,
  hideAddExerciseModal,
  handleAddExercise,
}) {
  const { dispatch, exerciseData } = useGlobalContext();
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    resetField,
    watch,
    formState: { errors },
  } = form;
  const registerWithMask = useHookFormMask(register);
  const [numMetrics, setNumMetrics] = useState(
    edit ? exerciseToEdit.metrics.length : defaultSetup?.length || 1
  );
  const arrayToMap = [...Array(numMetrics)];

  function handleSubmitExercise(data) {
    // format data into correct exercise shape
    // dispatch newExercise into exerciseData object
    // navigate away
    const id = exerciseData.length + 1;
    const { name, restTimer, description, ...metricsObject } = data;

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
      name,
      id,
      description,
      restTimer: restTimerSeconds,
      metrics: metricsArray,
    };
    const editedExerciseObject = {
      name,
      id: exerciseToEdit?.id,
      description,
      restTimer: restTimerSeconds,
      metrics: metricsArray,
    };
    console.log("raw data", data);
    console.log("exercise object", exerciseObject);
    console.log("edited exercise object", editedExerciseObject);

    {
      edit
        ? dispatch({ type: "edit-exercise", payload: editedExerciseObject })
        : dispatch({ type: "create-new-exercise", payload: exerciseObject });
    }

    // If workout in ProgressEvent, then add new exercise to workout directly and close modals
    if (workoutInProgress) {
      onHide();
      hideAddExerciseModal();
      handleAddExercise(exerciseObject);
    } else onHide();
  }

  return (
    <main>
      {edit ? (
        <h1 className="text-center display-3">Edit Exercise</h1>
      ) : (
        <h1 className="text-center display-3">New Exercise</h1>
      )}
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitExercise)}>
          <Form.Group controlId="exerciseName">
            <InputGroup>
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter exercise name"
                {...register("name")}
                autoFocus
                required
                defaultValue={edit ? exerciseToEdit?.name : ""}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="exerciseDescription" className="mt-2">
            <InputGroup>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Optional description"
                {...register("description")}
                defaultValue={edit ? exerciseToEdit?.description : ""}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="restTimer" className="mt-2">
            <InputGroup>
              <InputGroup.Text>Rest Timer</InputGroup.Text>

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
                defaultValue={
                  edit ? secondsToTime(exerciseToEdit?.restTimer) : ""
                }
              />
              <InputGroup.Text>min : sec</InputGroup.Text>
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="restTimer"
              render={({ message }) => (
                <p style={{ color: "var(--bs-danger)" }}>{message}</p>
              )}
            />
          </Form.Group>
          {edit ? (
            exerciseToEdit.metrics.map((metric, index) => (
              <ChooseBuildInputBar
                inputBar={metric.inputBar}
                register={register}
                setValue={setValue}
                getValues={getValues}
                resetField={resetField}
                watch={watch}
                index={index + 1}
                key={index}
                edit={true}
                defaultValue={metric}
              />
            ))
          ) : (
            <>
              {arrayToMap.map((metric, index) => (
                <AddMetricToExercise
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                  resetField={resetField}
                  watch={watch}
                  index={index + 1}
                  key={index}
                  defaultValue={defaultSetup ? defaultSetup[index] : ""}
                />
              ))}

              <IncrementButtonBar
                increment={() => setNumMetrics((prev) => prev + 1)}
                decrement={() =>
                  numMetrics > 0 && setNumMetrics((prev) => prev - 1)
                }
              >
                Metric
              </IncrementButtonBar>
            </>
          )}

          <SubmitButtonBar onHide={onHide} modal={true}>
            Save Exercise
          </SubmitButtonBar>
        </Form>
        <DevTool control={control} />
      </Container>
    </main>
  );
}

export default BuildExercise;
