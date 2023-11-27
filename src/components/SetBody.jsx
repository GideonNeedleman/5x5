import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsPlusLg, BsDashLg } from "react-icons/bs";

function SetBody({
  set,
  register,
  setValue,
  getValues,
  isFinished,
  isUnlocked,
}) {
  const weightFieldName = `weight`;
  const repsFieldName = `reps`;

  function stepMetric(metric, step) {
    setValue(metric, Number(getValues(metric)) + step);
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
              onClick={() => stepMetric("weight", -5)}
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
              onClick={() => stepMetric("weight", 5)}
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
          onClick={() => stepMetric("reps", -1)}
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
          onClick={() => stepMetric("reps", 1)}
        >
          <BsPlusLg />
        </Button>
      </InputGroup>
    </>
  );
}

export default SetBody;
