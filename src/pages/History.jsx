import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import DataTable from "../features/visualizations/DataTable";
import { useGlobalContext } from "../context/GlobalContext";

function History() {
  const { workoutData } = useGlobalContext();
  return (
    <Container as="main">
      <h3 className="text-center mt-3">Historic Data</h3>
      <DataTable data={workoutData} />
      <Link to="/">Go home</Link>
    </Container>
  );
}

export default History;
