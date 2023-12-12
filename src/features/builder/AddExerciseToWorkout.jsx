import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useGlobalContext } from "../../context/GlobalContext";
import AddSetToExercise from "./AddSetToExercise";

function AddExerciseToWorkout({ register, watch, index }) {
  const { exerciseData } = useGlobalContext();
  const chosenExerciseId = watch(`exercise-${index + 1}`);
  const chosenExercise = exerciseData.find((el) => el.id == chosenExerciseId);
  const [numSets, setNumSets] = useState(1);
  const arrayToMap = [...Array(numSets)];

  console.log("chosen exercise", chosenExercise);
  // what if user defines sets, then changes the exercise? Should remove all the sets with useEffect, setNumSets(0)
  useEffect(() => {
    setNumSets(0);
  }, [chosenExerciseId]);

  return (
    <Card border="primary">
      <Card.Body className="d-flex flex-column gap-3">
        <Form.Select {...register(`exercise-${index + 1}`)}>
          <option>Choose exercise...</option>
          <option value="new">+ Create new exercise</option>
          {exerciseData.map((exercise) => (
            <option value={exercise.id} key={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </Form.Select>
        {Number(chosenExerciseId) > 0 &&
          arrayToMap.map((el, index) => (
            <AddSetToExercise
              key={index}
              setIndex={index}
              metrics={chosenExercise.metrics}
            />
          ))}
        {Number(chosenExerciseId) > 0 && (
          <div className="d-flex gap-3">
            <Button
              className="w-100"
              variant="secondary"
              onClick={() => {
                numSets > 0 && setNumSets((prev) => prev - 1);
              }}
            >
              &minus; Remove set
            </Button>
            <Button
              className="w-100"
              variant="secondary"
              onClick={() => {
                setNumSets((prev) => prev + 1);
              }}
            >
              + Add set
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default AddExerciseToWorkout;