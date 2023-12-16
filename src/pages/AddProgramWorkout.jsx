import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { useGlobalContext } from "../context/GlobalContext";
import ProgramCard from "../features/home-screen/ProgramCard";
import WorkoutButton from "../features/workout/WorkoutButton";

function AddProgramWorkout() {
  const navigate = useNavigate();
  const { activePrograms, programData, workoutData } = useGlobalContext();
  const availablePrograms = programData.filter(
    (program) => !activePrograms.includes(program.id)
  );
  const { dispatch } = useGlobalContext();

  function handleAddWorkout(workout) {
    dispatch({ type: "add-workout", payload: workout });
    navigate("/");
  }

  // console.log(availablePrograms);
  return (
    <main>
      <h1 className="text-center display-3">Add to Home</h1>
      <h2 className="text-center">Programs</h2>
      <Container className="d-flex flex-column gap-2">
        {availablePrograms.map((program) => (
          <ProgramCard
            program={program}
            icon="add"
            disableButtons={true}
            key={program.id}
          />
        ))}

        <Button
          className="w-100"
          onClick={() => {
            vibrator(1);
            navigate("/build-program");
          }}
        >
          + New Program
        </Button>

        <h2 className="text-center">Workouts</h2>
        <Card border="secondary">
          <Card.Body className="d-flex flex-column gap-2">
            {workoutData.map((workout) => (
              <Button
                variant="secondary"
                onClick={() => handleAddWorkout(workout)}
                key={workout.id}
              >
                {workout.name}
              </Button>
            ))}
          </Card.Body>
        </Card>

        <Button
          className="w-100"
          onClick={() => {
            navigate("/build-workout");
            vibrator(1);
          }}
        >
          + New Workout
        </Button>
        <h2 className="text-center">Build New Exercise</h2>
        <Button
          onClick={() => {
            navigate("/build-exercise");
            vibrator(1);
          }}
          className="w-100"
        >
          + New Exercise
        </Button>
      </Container>
    </main>
  );
}

export default AddProgramWorkout;
