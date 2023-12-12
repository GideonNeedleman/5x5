import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container } from "react-bootstrap";
import WorkoutButton from "../features/workout/WorkoutButton";
import { useGlobalContext } from "../context/GlobalContext";
import vibrator from "vibrator";
import { useNavigate } from "react-router-dom";

function SelectWorkout() {
  const { programData: programs } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <main>
      <h1 className="d-flex display-3 justify-content-center">
        Select Workout
      </h1>
      <Stack
        gap={2}
        className="col-sm-5 mx-auto px-2"
        style={{ overflow: "hidden" }}
      >
        {programs.map((program) => (
          <div key={program.name}>
            <p className="mb-0">{program.name}</p>
            <Stack
              gap={2}
              className="col-sm-5 mx-auto px-2"
              style={{ overflow: "hidden" }}
            >
              {program.workouts.map((workout) => (
                <WorkoutButton
                  key={workout.name}
                  workout={workout}
                  program={program}
                >
                  {workout.name}
                </WorkoutButton>
              ))}
            </Stack>
          </div>
        ))}
        <Button
          variant="outline-dark"
          onClick={() => {
            vibrator(1);
            navigate("/builder");
          }}
        >
          + Add Program / Workout
        </Button>
        <Button variant="outline-secondary" onClick={() => vibrator(1)}>
          Just go
        </Button>
      </Stack>
      <Container className="mt-2 mb-2 d-flex justify-content-center">
        <Calendar />
      </Container>
    </main>
  );
}

export default SelectWorkout;
