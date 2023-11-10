import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";

function DoSet({
  set,
  numSets,
  index,
  activeKey,
  handleFinishSet,
  handleNextExercise,
  isLastExercise,
  handleFinishWorkout,
}) {
  const isLastSet = index + 1 === numSets && isLastExercise;

  function handleClick() {
    if (isLastSet) {
      handleFinishWorkout();
      return;
    }
    if (index + 1 === numSets) handleNextExercise();
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
        <p>Weight: {set.weight}lbs</p>
        <p>Reps: {set.reps}lbs</p>
        <Button className="w-100 my-2" onClick={handleClick}>
          {isLastSet ? "Finish Workout" : "Rest Timer"}
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoSet;
