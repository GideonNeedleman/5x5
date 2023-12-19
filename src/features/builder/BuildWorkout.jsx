import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import AddExerciseToWorkout from "./AddExerciseToWorkout";
import IncrementButtonBar from "../../components/IncrementButtonBar";
import SubmitButtonBar from "../../components/SubmitButtonBar";

function BuildWorkout({ edit = false, workoutToEdit }) {
  const { dispatch, workoutData, exerciseData } = useGlobalContext();
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    resetField,
    // formState: { errors },
  } = form;

  const [numExercises, setNumExercises] = useState(
    edit ? workoutToEdit.exercises.length : 1
  );
  // console.log("numExercises", numExercises);
  // const arrayToMap = [...Array(numExercises)];
  let arrayToMap = [...Array(numExercises)];
  if (edit)
    for (let i = 0; i < numExercises; i++) {
      arrayToMap[i] = workoutToEdit.exercises[i];
    }

  function handleSubmitWorkout(data) {
    const id = workoutData.length + 1;
    const { name } = data; // grab workout name
    let nextSetId = 0; // running tally to specify setId
    // 1) Create exercises array to hold exercise objects
    let exerciseArray = [];
    // 2) loop over data for numExercises. Grab exerciseId to populate from exerciseData,
    for (let i = 1; i <= numExercises; i++) {
      const exerciseId = Number(data[`exerciseId-${i}`]);
      const exercise = exerciseData.find((el) => el.id == exerciseId);
      // Find numSets
      const numSets = data[`exercise-${i}-numSets`];
      // Build sets array with another loop from all matching exercise-i-set-
      let sets = [];
      for (let j = 1; j <= numSets; j++) {
        nextSetId++;
        // Get metrics for set i by looping over its k metrics and building up metricsObject. Grab metric name (key) from exercise metrics array
        const metricsObject = {};
        for (let k = 0; k < exercise.metrics.length; k++) {
          const key = exercise.metrics[k].name;
          metricsObject[key] = data[`exercise-${i}-set-${j}-${key}`];
        }

        const setObject = { id: nextSetId, metrics: metricsObject };
        sets = [...sets, setObject];
      }

      // Combine to build exerciseObject (Note: specify id:i after spreading ...exercise to overwrite id property inside exercise)
      const exerciseObject = { ...exercise, sets };
      // Add to exerciseArray
      exerciseArray = [...exerciseArray, exerciseObject];
    }

    // combine exercises array with workout id & name
    const workoutObject = { id, name, exercises: exerciseArray };
    const editWorkoutObject = {
      id: workoutToEdit?.id,
      name,
      exercises: exerciseArray,
    };
    // dispatch to add workout to workoutData
    {
      edit
        ? dispatch({ type: "edit-workout", payload: editWorkoutObject })
        : dispatch({ type: "create-new-workout", payload: workoutObject });
    }
    // navigate back
    navigate(-1);
    console.log("raw data", data);
    console.log("final object", workoutObject);
  }
  return (
    <main>
      {!edit && <h1 className="text-center display-3">New Workout</h1>}
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitWorkout)}>
          <Form.Group>
            <Form.Label>Workout Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout name"
              {...register("name")}
              autoFocus
              defaultValue={workoutToEdit?.name}
            />
          </Form.Group>

          <div className="my-3">
            <p>Add Exercise to Workout</p>
            <div className="d-flex flex-column gap-3">
              {arrayToMap.map((el, index) => (
                <AddExerciseToWorkout
                  key={index}
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  resetField={resetField}
                  watch={watch}
                  index={index}
                  defaultExercise={edit ? el : null}
                  edit={edit}
                />
              ))}
            </div>

            {/* <div className="d-flex gap-3">
              {numExercises > 0 && (
                <Button
                  className="mt-3 w-100"
                  variant="secondary"
                  onClick={() => {
                    setNumExercises((prev) => prev - 1);
                    vibrator(1);
                  }}
                >
                  &minus; Exercise
                </Button>
              )}
              <Button
                className="mt-3 w-100"
                variant="secondary"
                onClick={() => {
                  setNumExercises((prev) => prev + 1);
                  vibrator(1);
                }}
              >
                + Exercise
              </Button>
            </div> */}

            <IncrementButtonBar
              increment={() => setNumExercises((prev) => prev + 1)}
              decrement={() =>
                numExercises > 1 && setNumExercises((prev) => prev - 1)
              }
            >
              Exercise
            </IncrementButtonBar>
          </div>

          <SubmitButtonBar>Save Workout</SubmitButtonBar>
        </Form>
        <DevTool control={control} />
      </Container>
    </main>
  );
}

export default BuildWorkout;
