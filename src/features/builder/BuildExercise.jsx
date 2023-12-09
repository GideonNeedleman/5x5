import {
  Button,
  Container,
  Form,
  FormLabel,
  InputGroup,
} from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useGlobalContext } from "../../context/GlobalContext";
import ExerciseMetric from "./ExerciseMetric";
import { useNavigate } from "react-router-dom";

function BuildExercise() {
  const { dispatch, exerciseData } = useGlobalContext();
  const navigate = useNavigate();
  const form = useForm();
  const { register, control, handleSubmit, setValue, getValues } = form;
  const [numMetrics, setNumMetrics] = useState(1);

  function handleSubmitExercise(data) {
    // format data into correct exercise shape
    // dispatch newExercise into exerciseData object
    // navigate away
    console.log(data);
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
            />
          </Form.Group>

          <Form.Group controlId="restTimer" className="mt-3">
            <Form.Label>Rest Timer</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Time between sets"
                {...register("restTimer", {
                  valueAsNumber: true,
                  min: 0,
                  // need to x60 to get seconds
                })}
              />
              <InputGroup.Text>minutes</InputGroup.Text>
            </InputGroup>
            <Form.Text>Enter 0 or blank for no rest timer.</Form.Text>
          </Form.Group>
          <ExerciseMetric register={register} index={1} />
          <Button
            className="mt-3 w-100"
            variant="secondary"
            onClick={() => setNumMetrics((prev) => prev + 1)}
          >
            + Add Metric
          </Button>
          <div className="d-flex gap-3 my-3">
            <Button
              variant="secondary"
              className="flex-grow-1 w-100 "
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button className="flex-grow-1 w-100" type="submit">
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
