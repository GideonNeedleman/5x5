import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { useGlobalContext } from "../context/GlobalContext";

function SetBody({ set, register, exerciseId }) {
  const { isWorkoutStarted } = useGlobalContext();
  return (
    <>
      {set.weight && (
        <>
          <p className="text-center fw-semibold m-0">Weight (lbs)</p>
          <InputGroup className="mb-2">
            <Button
              variant="secondary"
              id="button-minus-weight"
              disabled={!isWorkoutStarted}
              // how to decrement weight value?
            >
              <BsDashLg />
            </Button>
            <Form.Control
              className="text-center"
              type="number"
              {...register(`exercise-${exerciseId}-weight-${set.id}`)}
              // value={set.weight} // how to onChange value with react hook form?
              aria-label="Weight"
              disabled={!isWorkoutStarted}
            />
            <Button
              variant="secondary"
              id="button-plus-weight"
              disabled={!isWorkoutStarted}
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
          disabled={!isWorkoutStarted}
        >
          <BsDashLg />
        </Button>
        <Form.Control
          className="text-center"
          {...register(`exercise-${exerciseId}-reps-${set.id}`)}
          type="number"
          // value={set.reps}
          aria-label="reps"
          disabled={!isWorkoutStarted}
        />
        <Button
          variant="secondary"
          id="button-plus-reps"
          disabled={!isWorkoutStarted}
        >
          <BsPlusLg />
        </Button>
      </InputGroup>
    </>
  );
}

export default SetBody;
