import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Builder() {
  const navigate = useNavigate();
  return (
    <main>
      <h1 className="text-center display-3">Builder</h1>
      <Container className="d-flex flex-column gap-2">
        <Button onClick={() => navigate("/build-exercise")} className="w-100">
          + New Exercise
        </Button>
        <Button className="w-100">+ New Workout</Button>
        <Button className="w-100">+ New Program</Button>
      </Container>
    </main>
  );
}

export default Builder;
