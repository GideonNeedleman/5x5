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
  checkExercise,
  setNumFinishedSets,
  register,
  exerciseId,
  setValue,
  getValues,
}) {
  // const handleFinishWorkout = useFinishWorkout();
  const { dispatch } = useGlobalContext();
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  function handleClick() {
    setIsFinished(true); // disables 'finish set' button
    setNumFinishedSets((prev) => prev + 1); // tally to display check mark in exercise head
    checkExercise(); // display check mark in set head
    handleFinishSet(); // increment to next set

    if (index + 1 === numSets) dispatch({ type: "next-exercise" }); // if last set for exercise then go to next exercise
  }

  return (
    <Accordion.Item eventKey={`${index - 1 + activeKey}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className={isFinished ? "text-secondary" : "fw-bold "}>
            {isFinished && (
              <BsCheckSquareFill style={{ color: "var(--bs-blue)" }} />
            )}{" "}
            Set {index + 1}
          </span>
        </span>
      </Accordion.Header>
      <Accordion.Body style={{ backgroundColor: "var(--bs-gray-200)" }}>
        <SetBody
          set={set}
          register={register}
          exerciseId={exerciseId}
          setValue={setValue}
          getValues={getValues}
          isFinished={isFinished}
          isUnlocked={isUnlocked}
        />
        {isNoteVisible && (
          <SetNote
            set={set}
            register={register}
            exerciseId={exerciseId}
            isFinished={isFinished}
            isUnlocked={isUnlocked}
          />
        )}
        <SetButtons
          isNoteVisible={isNoteVisible}
          setIsNoteVisible={setIsNoteVisible}
          handleClick={handleClick}
          isFinished={isFinished}
          isUnlocked={isUnlocked}
          setIsUnlocked={setIsUnlocked}
        />
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoSet;
