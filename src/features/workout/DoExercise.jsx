import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import DoSet from "./DoSet";
import { BsCheckSquareFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import vibrator from "vibrator";

function DoExercise({
  exercise,
  sets,
  index,
  tracker,
  setNumFinishedExercises,
  expandedWorkout,
  setExpandedWorkout,
}) {
  const [activeKey, setActiveKey] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [numFinishedSets, setNumFinishedSets] = useState(0);

  // moreSets is to temporarily allow more sets to be added during workout
  const [moreSets, setMoreSets] = useState(sets);
  const numSets = moreSets.length;

  // console.log("sets", sets);
  // console.log("moreSets", moreSets);

  function handleFinishSet() {
    setActiveKey((prev) => prev - 1);
  }

  function checkExerciseFinished() {
    // numSets - 1 bc setNumFinishedSets async, so OBOB
    if (numFinishedSets === numSets - 1) {
      setIsFinished(true);
      setNumFinishedExercises((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (numFinishedSets < numSets && isFinished) {
      setIsFinished(false);
      setNumFinishedExercises((prev) => prev - 1);
    }
  }, [numSets, isFinished, numFinishedSets, setNumFinishedExercises]);

  function handleAddSet() {
    const newId = Math.floor(Math.random() * 1000000);

    const newSet = { ...moreSets[numSets - 1], id: newId };

    setMoreSets([...moreSets, newSet]);
    // console.log("new set", newSet);
    // console.log("more sets", moreSets);

    // Add new set to expandedWorkout sets array
    const fullSetsArray = [...moreSets, newSet];
    const newWorkout = {
      ...expandedWorkout,
      exercises: expandedWorkout.exercises.map((exercise, i) =>
        i === index ? { ...exercise, sets: fullSetsArray } : exercise
      ),
    };
    setExpandedWorkout(newWorkout);
  }

  return (
    <Accordion.Item eventKey={`${tracker}`}>
      <Accordion.Header id={`ex-${index}`}>
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
      <Accordion.Body className="">
        <Accordion defaultActiveKey="0" flush>
          {moreSets.map((set, i) => (
            <DoSet
              set={set}
              key={i}
              index={i}
              activeKey={activeKey}
              handleFinishSet={handleFinishSet}
              numSets={numSets}
              checkExercise={checkExerciseFinished}
              setNumFinishedSets={setNumFinishedSets}
              exercise={exercise}
              canToggle={i <= numFinishedSets}
              exerciseIndex={index}
            />
          ))}
        </Accordion>
        <div className="d-flex justify-content-center">
          <Button
            onClick={() => {
              vibrator(1);
              handleAddSet();
            }}
            className="mt-3"
            size="sm"
            variant="outline-dark"
          >
            + Add Set
          </Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoExercise;
