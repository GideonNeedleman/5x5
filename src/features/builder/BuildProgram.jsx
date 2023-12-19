import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import AddWorkoutToProgram from "./AddWorkoutToProgram";
import IncrementButtonBar from "../../components/IncrementButtonBar";
import SubmitButtonBar from "../../components/SubmitButtonBar";

function BuildProgram({ edit = false, programToEdit = null }) {
  const { dispatch, programData, workoutData } = useGlobalContext();
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    watch,
    // setValue,
    // getValues,
    // resetField,
    // formState: { errors },
  } = form;
  const [numWorkouts, setNumWorkouts] = useState(
    edit ? programToEdit.workouts.length : 1
  );
  // const arrayToMap = [...Array(numWorkouts)];
  let arrayToMap = [...Array(numWorkouts)];
  if (edit)
    for (let i = 0; i < numWorkouts; i++) {
      arrayToMap[i] = programToEdit.workouts[i];
    }

  function handleSubmitProgram(data) {
    const id = programData.length + 1;
    const { name } = data;

    // Loop i to numWorkouts, build up workout object, add to workouts array, then build final programObject and dispatch.

    // get numWorkouts
    const numWorkouts = Object.keys(data).filter((element) =>
      element.includes("id")
    ).length;

    // loop over all workouts
    let workouts = [];
    for (let i = 1; i <= numWorkouts; i++) {
      const order = i;
      const id = data[`id-${i}`];
      const chosenWorkout = workoutData.find((el) => el.id === id);
      const next = i === 1;

      const workoutObject = { ...chosenWorkout, order, next };
      workouts = [...workouts, workoutObject];
    }

    const programObject = { id, name, workouts };
    const editedProgramObject = { id: programToEdit?.id, name, workouts };
    {
      edit
        ? dispatch({ type: "edit-program", payload: editedProgramObject })
        : dispatch({ type: "create-new-program", payload: programObject });
    }
    // navigate(-1);
    console.log("raw data", data);
    console.log("final object", programObject);
  }

  return (
    <main>
      {!edit && <h1 className="text-center display-3">New Program</h1>}
      <Container>
        <Form onSubmit={handleSubmit(handleSubmitProgram)}>
          <Form.Group>
            <Form.Label>Program Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter program name"
              {...register("name")}
              autoFocus
              defaultValue={programToEdit?.name}
            />
          </Form.Group>

          <div className="my-3">
            <p>Add Workouts to Program</p>
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
                  defaultWorkout={edit ? el : null}
                />
              ))}
            </div>

            <IncrementButtonBar
              increment={() => setNumWorkouts((prev) => prev + 1)}
              decrement={() =>
                numWorkouts > 1 && setNumWorkouts((prev) => prev - 1)
              }
            >
              Workout
            </IncrementButtonBar>
          </div>

          <SubmitButtonBar>Save Program</SubmitButtonBar>
        </Form>
        <DevTool control={control} />
      </Container>
    </main>
  );
}

export default BuildProgram;
