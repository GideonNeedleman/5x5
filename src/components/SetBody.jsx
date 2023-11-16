import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsPlusLg, BsDashLg } from "react-icons/bs";

function SetBody({ weight, reps }) {
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
            <Button variant="outline-primary" id="button-addon2">
              <BsDashLg />
            </Button>
            <Form.Control
              className="text-center"
              type="number"
              value={weight}
              aria-label="Weight"
            />
            <Button variant="outline-primary" id="button-addon2">
              <BsPlusLg />
            </Button>
          </InputGroup>
        </>
      )}
      <p className="text-center fw-semibold m-0">Reps</p>
      <InputGroup className="mb-2">
        <Button variant="outline-primary" id="button-addon2">
          <BsDashLg />
        </Button>
        <Form.Control
          className="text-center"
          value={reps}
          aria-label="Weight"
        />
        <Button variant="outline-primary" id="button-addon2">
          <BsPlusLg />
        </Button>
      </InputGroup>
    </>
  );
}

export default SetBody;
