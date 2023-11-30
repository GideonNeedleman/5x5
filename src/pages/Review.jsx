import { useGlobalContext } from "../context/GlobalContext";
import ReviewDataTable from "../features/visualizations/ReviewDataTable";

function Review() {
  const { mostRecentWorkout } = useGlobalContext();
  return (
    // congratulations toast?
    <div>
      <h1 className="text-center">Review Your Workout</h1>
      {mostRecentWorkout.exercises.map((exercise) => (
        <ReviewDataTable exercise={exercise} key={exercise.id} />
      ))}
    </div>
  );
}

export default Review;
