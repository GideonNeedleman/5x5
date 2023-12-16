import { useState } from "react";
import { Card } from "react-bootstrap";
import { BsThreeDotsVertical, BsFillPlusSquareFill } from "react-icons/bs";
import WorkoutButton from "../workout/WorkoutButton";
import ProgramModal from "../workout/ProgramModal";
import { IconContext } from "react-icons";
import { useGlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function ProgramCard({ program, icon = "none", disableButtons = false }) {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function handleAddProgram() {
    dispatch({ type: "add-program", payload: program });
    console.log("added program", program);
    navigate("/");
  }

  function CorrectIcon({ icon }) {
    switch (icon) {
      case "menu":
        return (
          <BsThreeDotsVertical
            className="mt-1"
            onClick={() => setIsOpen(true)}
          />
        );
      case "add":
        return (
          <IconContext.Provider
            value={{ color: "var(--bs-primary)", size: "1.5rem" }}
          >
            <BsFillPlusSquareFill onClick={handleAddProgram} />
          </IconContext.Provider>
        );
      case "none":
        return <span />;
      default:
        break;
    }
  }

  // icon options: 'add': plus sign, 'menu': three dots, 'none': no icon
  return (
    <>
      <Card border="primary" style={{ width: "100%" }}>
        <Card.Header className="d-flex justify-content-between">
          <span className="fw-semibold text-capitalize">{program.name}</span>
          <CorrectIcon icon={icon} />
        </Card.Header>
        <Card.Body className="d-flex flex-column gap-2 py-2">
          {program.workouts.map((workout) => (
            <WorkoutButton
              key={workout.id}
              workout={workout}
              program={program}
              disabled={disableButtons}
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
  );
}

export default ProgramCard;
