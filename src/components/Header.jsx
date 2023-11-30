import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useGlobalContext } from "../context/GlobalContext";

function Header() {
  const { isWorkoutStarted, workoutData } = useGlobalContext();
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <LinkContainer to={"/"}>
          <Navbar.Brand>Exercise Tracker</Navbar.Brand>
        </LinkContainer>
        <Nav className="">
          {!isWorkoutStarted && workoutData.length > 0 && (
            <LinkContainer to={"/history"}>
              <Nav.Link>History</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
