import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import AddExerciseToWorkout from "./AddExerciseToWorkout";

function BuildWorkout() {
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
    formState: { errors },
  } = form;

  const [numExercises, setNumExercises] = useState(1);
  // console.log("numExercises", numExercises);
  const arrayToMap = [...Array(numExercises)];

  function handleSubmitWorkout(data) {
    const id = workoutData.length + 1;
    const { name, ...rest } = data; // grab workout name
    // 1) Create exercises array to hold exercise objects
    let exerciseArray = [];
    // 2) loop over data for numExercises. Grab exerciseIndex to populate from exerciseData,
    for (let i = 1; i <= numExercises; i++) {
      const exerciseIndex = Number(data[`exerciseIndex-${i}`]);
      const exercise = exerciseData.find((el) => el.id == exerciseIndex);
      console.log("exercise", exercise);
      // Find numSets

      // Build sets array with another loop from all matching exercise-i-set-

      /* for (let j = 1; j <= numSets; j++) {
        
      } */

      // Combine to build exerciseObject
      const exerciseObject = { exerciseIndex, id: i, ...exercise };
      // Add to exerciseArray
      exerciseArray = [...exerciseArray, exerciseObject];
    }

    // combine exercises array with workout id & name
    const workoutObject = { id, name, exercises: exerciseArray };
    console.log("raw data", data);
    console.log("final object", workoutObject);
  }
  return (
    <main>
      <h1 className="text-center display-3">New Workout</h1>
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitWorkout)}>
          <Form.Group>
            <Form.Label>Workout Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter workout name"
              {...register("name")}
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
                  watch={watch}
                  index={index}
                />
              ))}
            </div>

            <div className="d-flex gap-3 my-3">
              {numExercises > 0 && (
                <Button
                  className="mt-3 w-100"
                  variant="secondary"
                  onClick={() => {
                    setNumExercises((prev) => prev - 1);
                    vibrator(1);
                  }}
                >
                  &minus; Remove Exercise
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
                + Add Exercise
              </Button>
            </div>
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
              Save Workout
            </Button>
          </div>
        </Form>
        <DevTool control={control} />
      </Container>
    </main>
  );
}

export default BuildWorkout;
