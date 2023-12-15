import { Card } from "react-bootstrap";

function ProgramCard({ program }) {
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Header>{program.name}</Card.Header>
      <Card.Body>
        <Card.Title>Primary Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProgramCard;
