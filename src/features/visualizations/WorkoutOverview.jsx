import Card from "react-bootstrap/Card";
import { useGlobalContext } from "../../context/GlobalContext";
import dayjs from "dayjs";
import { displayDuration } from "../../utils/helpers";

function WorkoutOverview() {
  const { workoutHistory } = useGlobalContext();
  const mostRecentWorkout = workoutHistory.slice(-1)[0];
  const duration = dayjs(mostRecentWorkout.finishTime).diff(
    dayjs(mostRecentWorkout.startTime),
    "second"
  );
  console.log(mostRecentWorkout);
  console.log(duration);
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="pb-2">
      <Card
        border="primary"
        className="text-center "
        style={{ width: "18rem" }}
      >
        <Card.Header as="h5">{mostRecentWorkout.workoutName}</Card.Header>
        <Card.Body>
          <Card.Text>You worked out for {displayDuration(duration)}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default WorkoutOverview;
