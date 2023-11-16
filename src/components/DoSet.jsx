import { Accordion, Button, Col, Row } from "react-bootstrap";
import { useGlobalContext } from "../context/GlobalContext";
import SetBody from "./SetBody";
import { BsStickyFill } from "react-icons/bs";
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
}) {
  // const handleFinishWorkout = useFinishWorkout();
  const { dispatch } = useGlobalContext();
  const [isNoteVisible, setIsNoteVisible] = useState(false);

  const isLastSet = index + 1 === numSets && isLastExercise;

  function handleClick() {
    if (isLastSet) {
      // handleFinishWorkout();
      handleFinishSet();
      return;
    }
    if (index + 1 === numSets) dispatch({ type: "next-exercise" });
    else handleFinishSet();
  }

  return (
    <Accordion.Item eventKey={`${index - 1 + activeKey}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className="fw-bold">Set {index + 1}</span>
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
