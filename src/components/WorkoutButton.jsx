import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import WorkoutModal from "./WorkoutModal";
import { useGlobalContext } from "../context/GlobalContext";

function WorkoutButton({ children, workout }) {
  const [isOpen, setIsOpen] = useState(false);
  const variant = workout.next ? "primary" : "secondary";
  const { setActiveWorkout } = useGlobalContext();

  return (
    <div className="WorkoutButton">
      <Button className="w-100" variant={variant}>
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
