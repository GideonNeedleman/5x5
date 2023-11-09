import { useState } from "react";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

function DoExercise({ exercise, index }) {
  const [activeKey, setActiveKey] = useState(1);
  const sets = [];
  for (let i = 0; i < exercise.sets; i++) {
    sets.push(
      <Accordion.Item eventKey={`${i - 1 + activeKey}`} key={i}>
        <Accordion.Header>Set #{i + 1}</Accordion.Header>
        <Accordion.Body>
          <>
            input weight & rep values
            <Button
              className="w-100 my-2"
              onClick={() => setActiveKey((prev) => prev - 1)}
            >
              Rest Timer
            </Button>
          </>
        </Accordion.Body>
      </Accordion.Item>
    );
  }
  return (
    <Accordion.Item eventKey={`${index}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className="fw-bold">{exercise.name}</span>
          <span className="mx-1">{exercise.sets} sets</span>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <>
          <Accordion defaultActiveKey="0" flush>
            {sets}
          </Accordion>
        </>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoExercise;
