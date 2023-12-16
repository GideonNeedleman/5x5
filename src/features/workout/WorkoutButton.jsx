// import { useState } from "react";
import { Button } from "react-bootstrap";
// import WorkoutModal from "./ProgramModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";

function WorkoutButton({ children, workout, program, disabled = false }) {
  // const [isOpen, setIsOpen] = useState(false);
  const variant = disabled
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
        onClick={disabled ? handleAddWorkout : handleClick}
      >
        {children}
      </Button>
    </div>
  );
}

export default WorkoutButton;
