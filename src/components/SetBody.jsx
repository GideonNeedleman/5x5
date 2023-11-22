import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsPlusLg, BsDashLg } from "react-icons/bs";

function SetBody({
  set,
  register,
  exerciseId,
  setValue,
  getValues,
  isFinished,
  isUnlocked,
}) {
  const weightFieldName = `exercise-${exerciseId}-weight-${set.id}`;
  const repsFieldName = `exercise-${exerciseId}-reps-${set.id}`;

  function incrementWeight() {
    setValue(weightFieldName, getValues(weightFieldName) + 5);
  }

  function decrementWeight() {
    setValue(weightFieldName, getValues(weightFieldName) - 5);
  }

  function incrementReps() {
    setValue(repsFieldName, getValues(repsFieldName) + 1);
  }

  function decrementReps() {
    setValue(repsFieldName, getValues(repsFieldName) - 1);
  }

  return (
    <>
      {set.weight && (
        <>
          <p className="text-center fw-semibold m-0">Weight (lbs)</p>
          <InputGroup className="mb-2">
            <Button
              variant="secondary"
              id="button-minus-weight"
              disabled={isFinished && !isUnlocked}
              onClick={decrementWeight}
              // how to decrement weight value?
            >
              <BsDashLg />
            </Button>
            <Form.Control
              className="text-center"
              type="number"
              {...register(weightFieldName)}
              // value={set.weight} // how to onChange value with react hook form?
              aria-label="Weight"
              disabled={isFinished && !isUnlocked}
            />
            <Button
              variant="secondary"
              id="button-plus-weight"
              disabled={isFinished && !isUnlocked}
              onClick={incrementWeight}
            >
              <BsPlusLg />
            </Button>
          </InputGroup>
        </>
      )}
      <p className="text-center fw-semibold m-0">Reps</p>
      <InputGroup className="mb-2">
        <Button
          variant="secondary"
          id="button-minus-reps"
          disabled={isFinished && !isUnlocked}
          onClick={decrementReps}
        >
          <BsDashLg />
        </Button>
        <Form.Control
          className="text-center"
          {...register(repsFieldName)}
          type="number"
          aria-label="reps"
          disabled={isFinished && !isUnlocked}
        />
        <Button
          variant="secondary"
          id="button-plus-reps"
          disabled={isFinished && !isUnlocked}
          onClick={incrementReps}
        >
          <BsPlusLg />
        </Button>
      </InputGroup>
    </>
  );
}

export default SetBody;
