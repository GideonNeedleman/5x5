import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DoSet from "./DoSet";
import { BsCheckSquareFill } from "react-icons/bs";

function DoExercise({ exercise, numExercises, index, tracker }) {
  const [activeKey, setActiveKey] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [numFinishedSets, setNumFinishedSets] = useState(0);
  const numSets = exercise.sets.length;
  const isLastExercise = numExercises === index + 1;

  function handleFinishSet() {
    setActiveKey((prev) => prev - 1);
  }

  function checkExerciseFinished() {
    // numSets - 1 bc setNumFinishedSets async, so OBOB
    if (numFinishedSets === numSets - 1) setIsFinished(true);
  }
  return (
    <Accordion.Item eventKey={`${tracker}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className={isFinished ? "text-secondary" : "fw-bold "}>
            {isFinished && (
              <BsCheckSquareFill style={{ color: "var(--bs-blue)" }} />
            )}{" "}
            {exercise.name}
          </span>
          <span className="mx-1">{numSets} sets</span>
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
                numSets={numSets}
                isLastExercise={isLastExercise}
                checkExercise={checkExerciseFinished}
                setNumFinishedSets={setNumFinishedSets}
              />
            ))}
          </Accordion>
        </>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoExercise;
