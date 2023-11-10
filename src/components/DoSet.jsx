import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";

function DoSet({ set, index, activeKey, handleFinishSet }) {
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
        <Button className="w-100 my-2" onClick={handleFinishSet}>
          Rest Timer
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
  /*   return (
    <Accordion.Item eventKey={`${index}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className="fw-bold">{set.name}</span>
          <span className="mx-1">{exercise.sets} sets</span>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <>
          <Accordion defaultActiveKey="0" flush>
            {exercise.sets.map((set, index) => {})}
          </Accordion>
        </>
      </Accordion.Body>
    </Accordion.Item>
  ); */
}

export default DoSet;
