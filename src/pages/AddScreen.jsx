import { Button, Card, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { useGlobalContext } from "../context/GlobalContext";
import ProgramCard from "../features/home-screen/ProgramCard";
import { IconContext } from "react-icons";
import { BsFillPencilFill, BsFillPlusSquareFill } from "react-icons/bs";
import WorkoutButton from "../features/workout/WorkoutButton";

function AddScreen() {
  const navigate = useNavigate();
  const { activePrograms, programData, workoutData, exerciseData } =
    useGlobalContext();

  // availablePrograms are all programs not already on Home screen (in activePrograms array)
  const availablePrograms = programData.filter(
    (program) => !activePrograms.includes(program.id)
  );

  // availableWorkouts are all workouts not already in My Workouts list
  const availableWorkouts = workoutData.filter(
    (workout) => !programData[0].workouts.some((el) => el === workout.id)
  );

  // create filteredWorkouts to only display workouts that are not already displayed on this page inside availablePrograms: 1) create temp array / set of all workout ids in all availablePrograms.
  let tempWorkoutIds = [];
  for (let i = 0; i < availablePrograms.length; i++) {
    for (let j = 0; j < availablePrograms[i].workouts.length; j++) {
      tempWorkoutIds = [...tempWorkoutIds, availablePrograms[i].workouts[j]];
    }
  }
  // 2) filter availableWorkouts more by removing matches in this array
  const filteredWorkouts = availableWorkouts
    .filter((workout) => !tempWorkoutIds.includes(workout.id))
    .map((el) => el.id);

  return (
    <main>
      <h1 className="text-center display-3">Add to Home</h1>
      <p className="text-center mb-0">
        Tap{" "}
        <IconContext.Provider
          value={{ color: "var(--bs-primary)", size: "1.2rem" }}
        >
          <BsFillPlusSquareFill className="me-1 mb-1" />
        </IconContext.Provider>
        to add Program
      </p>
      <p className="text-center mb-1">
        Tap Workout button to add to My Workouts
      </p>
      <hr className="border-primary border-2 my-2" />
      <h2 className="text-center">Programs</h2>
      <Container className="d-flex flex-column gap-2 align-items-center">
        {availablePrograms.map((program) => (
          <ProgramCard
            program={program}
            icon="add"
            location="add"
            key={program.id}
          />
        ))}

        <Button
          className="w-75"
          onClick={() => {
            vibrator(1);
            navigate("/build-program");
          }}
        >
          + New Program
        </Button>

        <h2 className="text-center mb-0">Additional Workouts</h2>
        <Card border="secondary" style={{ width: "100%" }}>
          <Card.Body className="d-flex flex-column gap-2">
            {filteredWorkouts.map((workout, index) => (
              <WorkoutButton
                key={index}
                index={index}
                workoutId={workout}
                location="add"
              />
            ))}
          </Card.Body>
        </Card>

        <Button
          className="w-75"
          onClick={() => {
            navigate("/build-workout");
            vibrator(1);
          }}
        >
          + New Workout
        </Button>

        {/* Exercises table */}
        <h2 className="text-center mb-0">Exercises</h2>
        <Table striped bordered>
          <tbody>
            {exerciseData.map((exercise, index) => (
              <tr key={index}>
                <td className="text-center">
                  <Button
                    onClick={() => {
                      navigate(`/edit-exercise/${exercise.id}`);
                      vibrator(1);
                    }}
                    variant="warning"
                    className="w-75"
                    size="sm"
                  >
                    <BsFillPencilFill />
                  </Button>
                </td>
                <td className="lh-lg">{exercise.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          onClick={() => {
            navigate("/build-exercise");
            vibrator(1);
          }}
          className="w-75 mb-3"
        >
          + New Exercise
        </Button>
      </Container>
    </main>
  );
}

export default AddScreen;
