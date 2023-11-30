import { useGlobalContext } from "../context/GlobalContext";
import DataTable from "../features/visualizations/DataTable";

function Review() {
  const { mostRecentWorkout, workoutData } = useGlobalContext();
  return (
    <div>
      <h1 className="text-center">Review Your Workout</h1>
      {mostRecentWorkout.exercises.map((exercise) => (
        <DataTable exercise={exercise} key={exercise.id} />
      ))}
    </div>
  );
}

export default Review;
