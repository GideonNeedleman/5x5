import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useGlobalContext } from "../../context/GlobalContext";
import AddSetToExercise from "./AddSetToExercise";
import vibrator from "vibrator";

function AddExerciseToWorkout({ register, setValue, getValues, watch, index }) {
  const { exerciseData } = useGlobalContext();
  const chosenExerciseId = watch(`exerciseIndex-${index + 1}`);
  const chosenExercise = exerciseData.find((el) => el.id == chosenExerciseId);
  const [numSets, setNumSets] = useState();
  const arrayToMap = [...Array(numSets)];

  // Remove sets if user changes exercise
  useEffect(() => {
    setNumSets(1);
  }, [chosenExerciseId]);

  setValue(`exercise-${index + 1}-numSets`, numSets);

  return (
    <Card bg="primary">
      <Card.Body className="d-flex flex-column gap-3">
        <Form.Select
          {...register(`exerciseIndex-${index + 1}`)}
          className="fs-3 text-center"
        >
          <option>Choose exercise...</option>
          <option value="new">+ Create new exercise</option>
          {exerciseData.map((exercise) => (
            <option value={exercise.id} key={exercise.id}>
              {exercise.name}
            </option>
          ))}
        </Form.Select>

        {/* Hidden field holding numSets */}
        <input {...register(`exercise-${index + 1}-numSets`)} type="hidden" />

        {/* Set default cards */}
        {Number(chosenExerciseId) > 0 &&
          arrayToMap.map((el, setIndex) => (
            <AddSetToExercise
              key={setIndex}
              register={register}
              getValues={getValues}
              setValue={setValue}
              setIndex={setIndex}
              metrics={chosenExercise.metrics}
              exerciseId={index + 1}
            />
          ))}

        {/* Add / Remove set buttons */}
        {Number(chosenExerciseId) > 0 && (
          <div className="d-flex gap-3">
            <Button
              className="w-100"
              variant="secondary"
              onClick={() => {
                numSets > 0 && setNumSets((prev) => prev - 1);
                vibrator(1);
              }}
            >
              &minus; Remove set
            </Button>
            <Button
              className="w-100"
              variant="secondary"
              onClick={() => {
                setNumSets((prev) => prev + 1);
                vibrator(1);
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
