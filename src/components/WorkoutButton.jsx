import { useState } from "react";
import { Button } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import WorkoutModal from "./WorkoutModal";

function WorkoutButton({ children, workout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="WorkoutButton">
      <Button className="w-100" variant="secondary">
        {children}
      </Button>
      <Button
        variant="secondary"
        style={{ position: "absolute", right: "8px" }}
        onClick={() => setIsOpen(true)}
      >
        <BsThreeDotsVertical />
      </Button>

      <WorkoutModal show={isOpen} onHide={() => setIsOpen(false)} />
    </div>
  );
}

export default WorkoutButton;
