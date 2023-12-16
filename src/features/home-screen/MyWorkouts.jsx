import { Card } from "react-bootstrap";
import WorkoutButton from "../workout/WorkoutButton";
import { useGlobalContext } from "../../context/GlobalContext";

function MyWorkouts() {
  const { myWorkouts } = useGlobalContext();
  return (
    <Card border="primary" style={{ width: "100%" }}>
      <Card.Header className="d-flex justify-content-between">
        <span className="fw-semibold text-capitalize">My Workouts</span>
      </Card.Header>
      <Card.Body className="d-flex flex-column gap-2 py-2">
        {myWorkouts.map((workout) => (
          <WorkoutButton key={workout.name} workout={workout} program={program}>
            {workout.name}
          </WorkoutButton>
        ))}
      </Card.Body>
    </Card>
  );
}

export default MyWorkouts;
