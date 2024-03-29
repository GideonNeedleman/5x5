import { useState, useEffect, useRef } from "react";
import { Card, Form } from "react-bootstrap";
import { useGlobalContext } from "../../context/GlobalContext";
import AddSetToExercise from "./AddSetToExercise";
import IncrementButtonBar from "../../components/IncrementButtonBar";

function AddExerciseToWorkout({
  register,
  setValue,
  getValues,
  resetField,
  watch,
  index,
  defaultExercise,
  edit = false,
}) {
  const firstUpdate = useRef(1);
  const { exerciseData } = useGlobalContext();
  const chosenExerciseId = watch(`exerciseId-${index + 1}`);
  const chosenExercise = exerciseData.find((el) => el.id == chosenExerciseId);
  const [numSets, setNumSets] = useState(
    defaultExercise ? defaultExercise.sets.length : 1
  );
  // const arrayToMap = [...Array(numSets)];
  let arrayToMap = [...Array(numSets)];
  if (edit)
    for (let i = 0; i < numSets; i++) {
      arrayToMap[i] = defaultExercise?.sets[i];
    }

  // Remove sets if user changes exercise. Auto add first set.
  /*   useEffect(() => {
    setNumSets(1);
  }, [chosenExerciseId]); */
  // console.log(chosenExerciseId, firstUpdate.current);
  useEffect(() => {
    // using 4, but maybe should be 2 if not strict mode?
    if (firstUpdate.current < 4) {
      firstUpdate.current++;
    } else setNumSets(1);
  }, [chosenExerciseId]);

  // set value of hidden numSets field. Tells handleSubmitWorkout() how many sets to grab
  setValue(`exercise-${index + 1}-numSets`, numSets);

  return (
    <Card bg="primary">
      <Card.Body className="d-flex flex-column gap-1">
        <Form.Select
          {...register(`exerciseId-${index + 1}`)}
          className="fs-3 text-center"
          defaultValue={defaultExercise?.id}
        >
          <option value={0}>Choose exercise...</option>
          {/* <option value="new">+ Create new exercise</option> */}
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
              resetField={resetField}
              setIndex={setIndex}
              metrics={chosenExercise.metrics}
              exerciseId={index + 1}
            />
          ))}

        {/* Add / Remove set buttons */}
        {Number(chosenExerciseId) > 0 && (
          <>
            {/* <div className="d-flex gap-3 mt-3">
              <Button
                className="w-100"
                variant="secondary"
                onClick={() => {
                  numSets > 0 && setNumSets((prev) => prev - 1);
                  vibrator(1);
                }}
              >
                &minus; Set
              </Button>
              <Button
                className="w-100"
                variant="secondary"
                onClick={() => {
                  setNumSets((prev) => prev + 1);
                  vibrator(1);
                }}
              >
                + Set
              </Button>
            </div> */}
            <IncrementButtonBar
              decrement={() => numSets > 1 && setNumSets((prev) => prev - 1)}
              increment={() => setNumSets((prev) => prev + 1)}
            >
              Set
            </IncrementButtonBar>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default AddExerciseToWorkout;
