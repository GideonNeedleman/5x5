import { useState } from "react";
import { Button } from "react-bootstrap";
import WorkoutModal from "./WorkoutModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { BsThreeDotsVertical } from "react-icons/bs";

function WorkoutButton({ children, workout, program, location = "home" }) {
  // location options: home, myworkouts, add

  const variant = location === "home" && workout.next ? "primary" : "secondary";

  const [isOpen, setIsOpen] = useState(false);
  const { programData } = useGlobalContext();
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
    <div>
      <Button
        className="w-100"
        variant={variant}
        onClick={
          location === "home" || location === "myworkouts"
            ? handleClick
            : handleAddWorkout //location === 'add'
        }
        disabled={
          location === "add" &&
          programData[0].workouts.some((el) => el.id === workout.id)
        }
      >
        {children}
      </Button>
      {location === "myworkouts" && (
        <Button
          variant="secondary"
          style={{ position: "absolute", right: "16px" }}
          onClick={() => setIsOpen(true)}
        >
          <BsThreeDotsVertical />
        </Button>
      )}
      {isOpen && (
        <WorkoutModal
          show={isOpen}
          onHide={() => setIsOpen(false)}
          workout={workout}
        />
      )}
    </div>
  );
}

export default WorkoutButton;
