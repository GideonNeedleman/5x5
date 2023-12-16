// import { useState } from "react";
import { Button } from "react-bootstrap";
// import { BsThreeDotsVertical } from "react-icons/bs";
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

  return (
    <div className="WorkoutButton">
      <Button
        className="w-100"
        variant={variant}
        onClick={disabled ? undefined : handleClick}
      >
        {children}
      </Button>
    </div>
  );
}

export default WorkoutButton;
