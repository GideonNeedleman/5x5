import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

function BuildWorkout() {
  const { dispatch, workoutData, exerciseData } = useGlobalContext();
  const navigate = useNavigate();
  const form = useForm();
  const {
    register,
    control,
    handleSubmit,
    // setValue,
    // getValues,
    formState: { errors },
  } = form;

  const [numExercises, setNumExercises] = useState(1);
  console.log("numExercises", numExercises);
  const arrayToMap = [...Array(numExercises)];

  function handleSubmitWorkout() {}
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
            {arrayToMap.map((el, index) => (
              <Form.Select key={index} {...register(`exercise-${index + 1}`)}>
                <option value="new">Create new exercise</option>
                {exerciseData.map((exercise) => (
                  <option value={exercise.id} key={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </Form.Select>
            ))}
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
