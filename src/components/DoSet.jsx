import { Accordion } from "react-bootstrap";
import { BsCheckSquareFill } from "react-icons/bs";
import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import SetBody from "./SetBody";
import SetNote from "./SetNote";
import SetButtons from "./SetButtons";

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
          <span className={isFinished ? "text-secondary" : "fw-bold "}>
            {isFinished && <BsCheckSquareFill style={{ color: "#007afe" }} />}{" "}
            Set {index + 1}
          </span>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <SetBody weight={set.weight} reps={set.reps} />
        {isNoteVisible && <SetNote />}
        <SetButtons
          isNoteVisible={isNoteVisible}
          setIsNoteVisible={setIsNoteVisible}
          handleClick={handleClick}
          isLastSet={isLastSet}
        />
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoSet;
