import { Accordion, Button, Col, Row } from "react-bootstrap";
import { useGlobalContext } from "../context/GlobalContext";
import SetBody from "./SetBody";
import { BsStickyFill, BsCheckSquareFill } from "react-icons/bs";
import SetNote from "./SetNote";
import { useState } from "react";

// import { useFinishWorkout } from "../hooks/useFinishWorkout";

function DoSet({
  set,
  numSets,
  index,
  activeKey,
  handleFinishSet,
  isLastExercise,
  checkExercise,
}) {
  // const handleFinishWorkout = useFinishWorkout();
  const { dispatch } = useGlobalContext();
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const isLastSet = index + 1 === numSets && isLastExercise;

  function handleClick() {
    setIsFinished(true);
    if (isLastSet) {
      // handleFinishWorkout();
      handleFinishSet();
      checkExercise();
      return;
    }
    if (index + 1 === numSets) {
      dispatch({ type: "next-exercise" });
      checkExercise();
    } else handleFinishSet();
  }

  return (
    <Accordion.Item eventKey={`${index - 1 + activeKey}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className="fw-bold">
            {isFinished && <BsCheckSquareFill style={{ color: "#007afe" }} />}{" "}
            Set {index + 1}
          </span>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <SetBody weight={set.weight} reps={set.reps} />
        {isNoteVisible && <SetNote />}

        <Row className="mt-3">
          {!isNoteVisible && (
            <Col xs={2}>
              <Button
                variant="secondary"
                className=""
                onClick={() => setIsNoteVisible(true)}
              >
                <BsStickyFill />
              </Button>
            </Col>
          )}
          <Col>
            <Button className="w-100" onClick={handleClick}>
              {isLastSet ? "Finish Set" : "Finish Set"}
            </Button>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoSet;
