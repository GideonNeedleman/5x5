import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function History() {
  return (
    <Container as="main">
      <h3 className="text-center mt-3">Visualize past data here</h3>
      <Link to="/">Go home</Link>
    </Container>
  );
}

export default History;
