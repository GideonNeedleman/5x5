import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
/* import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; */

function SelectWorkout() {
  return (
    <main>
      <h1 className="d-flex justify-content-center">Select Workout</h1>
      <Stack gap={2} className="col-sm-5 mx-auto px-2">
        <Button variant="secondary">A day</Button>
        <Button variant="secondary">B day</Button>
      </Stack>
    </main>
  );
}

export default SelectWorkout;
