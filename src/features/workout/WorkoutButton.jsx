import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import WorkoutModal from "./WorkoutModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function WorkoutButton({ children, workout, program }) {
  const [isOpen, setIsOpen] = useState(false);
  const variant = workout.next ? "primary" : "secondary";
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  function handleClick() {
    dispatch({ type: "select-workout", payload: { program, workout } });
    navigate("/");
  }

  return (
    <div className="WorkoutButton">
      <Button className="w-100" variant={variant} onClick={handleClick}>
        {children}
      </Button>
      <Button
        variant={variant}
        style={{ position: "absolute", right: "16px" }}
        onClick={() => setIsOpen(true)}
      >
        <BsThreeDotsVertical />
      </Button>

      <WorkoutModal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        workout={workout}
      />
    </div>
  );
}

export default WorkoutButton;
