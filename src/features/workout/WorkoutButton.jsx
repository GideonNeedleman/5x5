import { useState } from "react";
import { Button } from "react-bootstrap";
import WorkoutModal from "./WorkoutModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import vibrator from "vibrator";
import { BsThreeDotsVertical } from "react-icons/bs";

function WorkoutButton({ workoutId, index, program, location = "home" }) {
  // location options: home, myworkouts, add

  const { dispatch, programData, workoutData } = useGlobalContext();
  const workout = workoutData.find((el) => el.id === workoutId);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const variant =
    location === "home" && program.next === index ? "primary" : "secondary";

  function handleClick() {
    dispatch({ type: "select-workout", payload: { program, workout, index } });
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
        {workout.name}
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
