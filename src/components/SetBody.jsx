import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsPlusLg, BsDashLg } from "react-icons/bs";
import { useGlobalContext } from "../context/GlobalContext";

function SetBody({ weight, reps }) {
  const { isWorkoutStarted } = useGlobalContext();
  return (
    <>
      {/*       <InputGroup className="mb-3">
        <Button variant="outline-secondary" id="button-addon1">
          Button
        </Button>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
        />
      </InputGroup> */}
      {weight && (
        <>
          <p className="text-center fw-semibold m-0">Weight (lbs)</p>
          <InputGroup className="mb-2">
            <Button
              variant="outline-primary"
              id="button-minus-weight"
              disabled={!isWorkoutStarted}
            >
              <BsDashLg />
            </Button>
            <Form.Control
              className="text-center"
              type="number"
              value={weight}
              aria-label="Weight"
              disabled={!isWorkoutStarted}
            />
            <Button
              variant="outline-primary"
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
          variant="outline-primary"
          id="button-minus-reps"
          disabled={!isWorkoutStarted}
        >
          <BsDashLg />
        </Button>
        <Form.Control
          className="text-center"
          value={reps}
          aria-label="Weight"
          disabled={!isWorkoutStarted}
        />
        <Button
          variant="outline-primary"
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
