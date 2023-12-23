import Button from "react-bootstrap/Button";
// import Stack from "react-bootstrap/Stack";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container } from "react-bootstrap";
// import WorkoutButton from "../features/workout/WorkoutButton";
import { useGlobalContext } from "../context/GlobalContext";
import vibrator from "vibrator";
import { useNavigate } from "react-router-dom";
import ProgramCard from "../features/home-screen/ProgramCard";
import { IconContext } from "react-icons";
import { BsFillPlusSquareFill } from "react-icons/bs";

function SelectWorkout() {
  const { programData, activePrograms, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const programs = activePrograms.map((program) =>
    programData.find((element) => element.id === program)
  );

  // console.log(programs);

  return (
    <main>
      <h1 className="d-flex display-3 justify-content-center">
        Select Workout
      </h1>
      <Container className="d-flex flex-column align-items-center gap-2">
        {programs.map((program) => (
          <ProgramCard
            program={program}
            location={program.id === 0 ? "myworkouts" : "home"}
            icon="menu"
            key={program.id}
          />
        ))}
        <div className="d-flex gap-2 w-100">
          <Button
            className="w-50"
            variant="outline-dark"
            onClick={() => {
              vibrator(1);
              navigate("/add-program-workout");
            }}
          >
            <IconContext.Provider
              value={{ color: "var(--bs-primary)", size: "1.5rem" }}
            >
              <BsFillPlusSquareFill className="me-1 pb-1" />
            </IconContext.Provider>
            Workouts
          </Button>
          <Button
            className="w-50"
            variant="outline-primary"
            onClick={() => {
              vibrator(1);
              dispatch({ type: "just-go" });
              navigate("/just-go");
            }}
          >
            Just go
          </Button>
        </div>
      </Container>
      <Container className="mt-2 mb-2 d-flex justify-content-center">
        <Calendar />
      </Container>
    </main>
  );
}

export default SelectWorkout;
