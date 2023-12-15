import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { useGlobalContext } from "../context/GlobalContext";
import ProgramCard from "../features/home-screen/ProgramCard";

function AddProgramWorkout() {
  const navigate = useNavigate();
  const { activePrograms, programData, workoutData } = useGlobalContext();
  const availablePrograms = programData.filter(
    (program) => !activePrograms.includes(program.id)
  );

  console.log(availablePrograms);
  return (
    <main>
      <h1 className="text-center display-3">Add to Home</h1>
      <h2 className="text-center display-4">Programs</h2>
      <Container className="d-flex flex-column gap-2">
        <Button
          className="w-100"
          onClick={() => {
            vibrator(1);
            navigate("/build-program");
          }}
        >
          + New Program
        </Button>
        {availablePrograms.map((program) => (
          <ProgramCard program={program} icon="add" key={program.id} />
        ))}

        <h2 className="text-center display-4">Workouts</h2>
        <Button
          className="w-100"
          onClick={() => {
            navigate("/build-workout");
            vibrator(1);
          }}
        >
          + New Workout
        </Button>
      </Container>
    </main>
  );
}

export default AddProgramWorkout;
