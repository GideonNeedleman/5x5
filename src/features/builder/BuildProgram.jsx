import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { useHookFormMask } from "use-mask-input";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import AddWorkoutToProgram from "./AddWorkoutToProgram";

function BuildProgram() {
  const { dispatch, programData, workoutData } = useGlobalContext();
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
    formState: { errors },
  } = form;
  const [numWorkouts, setNumWorkouts] = useState(0);
  const arrayToMap = [...Array(numWorkouts)];

  function handleSubmitProgram(data) {
    const id = programData.length + 1;
    const { name } = data;

    // need numWorkouts then loop i to numWorkouts, grab id=i, workoutIndex = workoutIndex-i, add name, next, exercises array, maybe order? I think can eliminate order and just use id. Since id is local variable, not PK.

    // numWorkouts
    const numWorkouts = Object.keys(data).filter((element) =>
      element.includes("workoutIndex")
    ).length;

    // console.log("numWorkouts", numWorkouts);

    let workouts = [];
    for (let i = 1; i <= numWorkouts; i++) {
      const id = i;
      const workoutIndex = data[`workoutIndex-${i}`];
      const chosenWorkout = workoutData.find((el) => el.id === workoutIndex);
      const next = i === 1;

      const workout = { ...chosenWorkout, id, next, workoutIndex };
      workouts = [...workouts, workout];
    }
    // convert to workouts array = [{id: 1}, {id:4}, {}]

    const programObject = { id, name, workouts };

    dispatch({ type: "add-new-program", payload: programObject });
    navigate(-1);
    console.log("raw data", data);
    console.log("final object", programObject);
  }

  return (
    <main>
      <h1 className="text-center display-3">New Program</h1>
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitProgram)}>
          <Form.Group>
            <Form.Label>Program Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter program name"
              {...register("name")}
              autoFocus
            />
          </Form.Group>

          <div className="my-3">
            <p>Add Workout to Program</p>
            <div className="d-flex flex-column gap-3">
              {arrayToMap.map((el, index) => (
                <AddWorkoutToProgram
                  key={index}
                  register={register}
                  index={index}
                  // getValues={getValues}
                  // setValue={setValue}
                  // resetField={resetField}
                  watch={watch}
                />
              ))}
            </div>

            <div className="d-flex gap-3 ">
              {numWorkouts > 0 && (
                <Button
                  className="mt-3 w-100"
                  variant="secondary"
                  onClick={() => {
                    setNumWorkouts((prev) => prev - 1);
                    vibrator(1);
                  }}
                >
                  &minus; Workout
                </Button>
              )}
              <Button
                className="mt-3 w-100"
                variant="secondary"
                onClick={() => {
                  setNumWorkouts((prev) => prev + 1);
                  vibrator(1);
                }}
              >
                + Workout
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
              Save Program
            </Button>
          </div>
        </Form>
        <DevTool control={control} />
      </Container>
    </main>
  );
}

export default BuildProgram;
