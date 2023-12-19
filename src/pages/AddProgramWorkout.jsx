import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { useGlobalContext } from "../context/GlobalContext";
import ProgramCard from "../features/home-screen/ProgramCard";
import { IconContext } from "react-icons";
import { BsFillPlusSquareFill } from "react-icons/bs";

function AddProgramWorkout() {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const { activePrograms, programData, workoutData } = useGlobalContext();

  // availablePrograms are all programs not already on Home screen (in activePrograms array)
  const availablePrograms = programData.filter(
    (program) => !activePrograms.includes(program.id)
  );

  // availableWorkouts are all workouts not already in My Workouts list
  const availableWorkouts = workoutData.filter(
    (workout) => !programData[0].workouts.some((el) => el.id === workout.id)
  );

  // create filteredWorkouts to only display workouts that are not already displayed on this page inside availablePrograms: 1) create temp array / set of all workout ids in all availablePrograms.
  let tempWorkoutIds = [];
  for (let i = 0; i < availablePrograms.length; i++) {
    for (let j = 0; j < availablePrograms[i].workouts.length; j++) {
      tempWorkoutIds = [...tempWorkoutIds, availablePrograms[i].workouts[j].id];
    }
  }
  // 2) filter availableWorkouts more by removing matches in this array
  const filteredWorkouts = availableWorkouts.filter(
    (workout) => !tempWorkoutIds.includes(workout.id)
  );

  function handleAddWorkout(workout) {
    dispatch({ type: "add-workout", payload: workout });
    navigate("/");
  }

  // console.log(availablePrograms);
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
            {filteredWorkouts.map((workout) => (
              <Button
                // className="w-100"
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
          className="w-75"
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
          className="w-75"
        >
          + New Exercise
        </Button>
      </Container>
    </main>
  );
}

export default AddProgramWorkout;