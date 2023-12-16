import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container } from "react-bootstrap";
// import WorkoutButton from "../features/workout/WorkoutButton";
import { useGlobalContext } from "../context/GlobalContext";
import vibrator from "vibrator";
import { useNavigate } from "react-router-dom";
import ProgramCard from "../features/home-screen/ProgramCard";
import MyWorkouts from "../features/home-screen/MyWorkouts";

function SelectWorkout() {
  const { programData, activePrograms } = useGlobalContext();
  const navigate = useNavigate();

  const programs = activePrograms.map((program) =>
    programData.find((element) => element.id === program)
  );

  // console.log(programs);

  return (
    <main>
      <h1 className="d-flex display-3 justify-content-center">
        Select Workout
      </h1>
      <Container className="d-flex flex-column align-items-center gap-2">
        {programs.map((program) => (
          <ProgramCard program={program} icon="menu" key={program.id} />
        ))}

        {/* Add Personal Workouts card here */}
        <MyWorkouts />
      </Container>
      <Stack
        gap={2}
        className="col-sm-5 mx-auto px-2 mt-2"
        style={{ overflow: "hidden" }}
      >
        <Button
          variant="dark"
          onClick={() => {
            vibrator(1);
            navigate("/add-program-workout");
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
