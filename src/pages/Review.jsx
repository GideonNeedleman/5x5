import { useGlobalContext } from "../context/GlobalContext";
import ReviewDataTable from "../features/visualizations/ReviewDataTable";

function Review() {
  const { tempWorkoutData, exerciseData } = useGlobalContext();
  // list of exerciseIds in tempWorkoutData
  const exerciseIds = [
    ...new Set(tempWorkoutData.map((set) => set.exerciseId)),
  ];
  // list of matching exercises
  const exercises = exerciseData.filter((exercise) =>
    exerciseIds.includes(exercise.id)
  );

  return (
    <div>
      <h1 className="text-center">Review Your Workout</h1>
      {exercises.map((exercise) => (
        <ReviewDataTable exercise={exercise} key={exercise.id} />
      ))}
    </div>
  );
}

export default Review;
