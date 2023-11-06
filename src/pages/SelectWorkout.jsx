import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { BsThreeDotsVertical } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container } from "react-bootstrap";
import WorkoutButton from "../components/WorkoutButton";

function SelectWorkout({ workouts }) {
  return (
    <main>
      <h1 className="d-flex justify-content-center">Select Workout</h1>
      <Stack
        gap={2}
        className="col-sm-5 mx-auto px-2"
        style={{ overflow: "hidden" }}
      >
        {workouts.map((workout) => (
          <WorkoutButton key={workout.name} workout={workout}>
            {workout.name}
          </WorkoutButton>
        ))}

        <Button variant="outline-dark">+ Add Program / Workout</Button>
        <Button variant="outline-secondary">Just go</Button>
      </Stack>
      <Container className="mt-2 mb-2 d-flex justify-content-center">
        <Calendar />
      </Container>
    </main>
  );
}

export default SelectWorkout;
