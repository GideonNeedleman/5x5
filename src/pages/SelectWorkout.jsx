import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsThreeDotsVertical } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container } from "react-bootstrap";

function SelectWorkout() {
  return (
    <main>
      <h1 className="d-flex justify-content-center">Select Workout</h1>
      <Stack gap={2} className="col-sm-5 mx-auto px-2">
        <div>
          <Button className="w-100" variant="secondary">
            A day
          </Button>
          <Button
            variant="secondary"
            style={{ position: "absolute", right: "8px" }}
          >
            <BsThreeDotsVertical />
          </Button>
        </div>

        <div>
          <Button className="w-100" variant="secondary">
            B day
          </Button>
          <Button
            variant="secondary"
            style={{ position: "absolute", right: "8px" }}
          >
            <BsThreeDotsVertical />
          </Button>
        </div>

        <Button variant="outline-secondary">+ Add Workout</Button>
      </Stack>
      <Container className="position-absolute bottom-0 mb-2 d-flex justify-content-center">
        <Calendar />
      </Container>
    </main>
  );
}

export default SelectWorkout;
