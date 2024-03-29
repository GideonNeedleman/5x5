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
        className="w-100 px-5"
        variant={variant}
        onClick={
          location === "home" || location === "myworkouts"
            ? () => {
                handleClick();
                vibrator(1);
              }
            : () => {
                handleAddWorkout();
                vibrator(1);
              } //location === 'add'
        }
        disabled={
          location === "add" &&
          programData[0].workouts.some((el) => el === workout.id)
        }
      >
        {workout.name}
      </Button>

      <Button
        variant={variant}
        style={{ position: "absolute", right: "16px" }}
        onClick={() => {
          setIsOpen(true);
          vibrator(1);
        }}
      >
        <BsThreeDotsVertical />
      </Button>

      {isOpen && (
        <WorkoutModal
          show={isOpen}
          onHide={() => setIsOpen(false)}
          workout={workout}
          location={location}
        />
      )}
    </div>
  );
}

export default WorkoutButton;
