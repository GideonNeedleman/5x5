import { useState } from "react";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import DoSet from "./DoSet";

function DoExercise({ exercise, index }) {
  const [activeKey, setActiveKey] = useState(1);

  function handleFinishSet() {
    setActiveKey((prev) => prev - 1);
  }
  return (
    <Accordion.Item eventKey={`${index}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className="fw-bold">{exercise.name}</span>
          <span className="mx-1">{exercise.sets.length} sets</span>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <>
          <Accordion defaultActiveKey="0" flush>
            {exercise.sets.map((set, i) => (
              <DoSet
                set={set}
                key={i}
                index={i}
                activeKey={activeKey}
                handleFinishSet={handleFinishSet}
              />
            ))}
          </Accordion>
        </>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoExercise;
