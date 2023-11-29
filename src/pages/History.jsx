import { Container } from "react-bootstrap";
import DataTable from "../features/visualizations/DataTable";
import { useGlobalContext } from "../context/GlobalContext";

function History() {
  const { mostRecentWorkout } = useGlobalContext();

  return (
    <Container as="main">
      {/* <h3 className="text-center mt-3">Historic Data</h3> */}
      {mostRecentWorkout.exercises.map((exercise) => (
        <DataTable exercise={exercise} key={exercise.id} />
      ))}
    </Container>
  );
}

export default History;
