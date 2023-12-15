import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import WorkoutButton from "../workout/WorkoutButton";
import ProgramModal from "../workout/ProgramModal";

function ProgramCard({ program }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card border="primary" style={{ width: "100%" }}>
        <Card.Header className="d-flex justify-content-between">
          <span className="fw-semibold text-capitalize">{program.name}</span>
          <BsThreeDotsVertical
            className="mt-1"
            onClick={() => setIsOpen(true)}
          />
        </Card.Header>
        <Card.Body className="d-flex flex-column gap-2 py-2">
          {program.workouts.map((workout) => (
            <WorkoutButton
              key={workout.name}
              workout={workout}
              program={program}
            >
              {workout.name}
            </WorkoutButton>
          ))}
        </Card.Body>
      </Card>
      <ProgramModal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        program={program}
      />
    </>
    // program modal here, copy from WorkoutModal
  );
}

export default ProgramCard;
