import { Button } from "react-bootstrap";
import { useGlobalContext } from "../context/GlobalContext";
import ReviewDataTable from "../features/visualizations/ReviewDataTable";
import WorkoutOverview from "../features/visualizations/WorkoutOverview";
import vibrator from "vibrator";
import { useNavigate } from "react-router-dom";

function Review() {
  const { tempRecordData, exerciseData } = useGlobalContext();
  // list of exerciseIds in tempRecordData
  const exerciseIds = [...new Set(tempRecordData.map((set) => set.exerciseId))];
  // list of matching exercises
  const exercises = exerciseData.filter((exercise) =>
    exerciseIds.includes(exercise.id)
  );
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center display-3">Workout Summary</h1>
      <WorkoutOverview />
      <Button
        className="ms-2"
        variant="warning"
        onClick={() => {
          vibrator(1);
          navigate("/");
        }}
      >
        Home
      </Button>
      {exercises.map((exercise) => (
        <ReviewDataTable exercise={exercise} key={exercise.id} />
      ))}
    </div>
  );
}

export default Review;
