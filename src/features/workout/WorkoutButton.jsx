// import { useState } from "react";
import { Button } from "react-bootstrap";
// import WorkoutModal from "./ProgramModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";

function WorkoutButton({ children, workout, program, disabled = false }) {
  // const [isOpen, setIsOpen] = useState(false);
  const isInMyWorkouts = program.id === 0;
  const variant =
    disabled || isInMyWorkouts
      ? "secondary"
      : workout.next
      ? "primary"
      : "secondary";
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  function handleClick() {
    dispatch({ type: "select-workout", payload: { program, workout } });
    navigate("/");
    vibrator(1);
  }

  function handleAddWorkout() {
    dispatch({ type: "add-workout", payload: workout });
    navigate("/");
  }

  return (
    <div className="WorkoutButton">
      <Button
        className="w-100"
        variant={variant}
        // stupid logic bc actually 3 states: 1) in My Workouts, 2) in Add Program Workout screen, 3) on Home screen inside a program
        onClick={
          isInMyWorkouts
            ? handleClick
            : disabled
            ? handleAddWorkout
            : handleClick
        }
      >
        {children}
      </Button>
    </div>
  );
}

export default WorkoutButton;
