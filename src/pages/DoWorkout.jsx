import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Button from "react-bootstrap/Button";

function DoWorkout() {
  const {
    activeWorkout: workout,
    isWorkoutStarted,
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();

  function handleBack() {
    dispatch({ type: "clear-workout" });
    navigate("/");
  }

  function handleFinishWorkout() {
    dispatch({ type: "finish-workout" });
    navigate("/");
  }

  return (
    <main className="mx-2">
      <h1 className="display-1 text-center">{workout.name} </h1>

      {/* Back button is to cancel workout before starting */}
      {isWorkoutStarted === false && (
        <Button variant="warning" onClick={handleBack}>
          Back
        </Button>
      )}
      <div>Exercises go here...</div>
      <Button className="w-100" onClick={handleFinishWorkout}>
        Finish Workout
      </Button>
    </main>
  );
}

export default DoWorkout;
