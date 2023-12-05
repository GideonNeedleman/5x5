import { Accordion } from "react-bootstrap";
import { BsCheckSquareFill } from "react-icons/bs";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import SetBody from "./SetBody";
import SetNote from "./SetNote";
import SetButtons from "./SetButtons";

function DoSet({
  set,
  numSets,
  index,
  activeKey,
  handleFinishSet,
  checkExercise,
  setNumFinishedSets,
  exercise,
  canToggle,
}) {
  const { dispatch, tempWorkoutData } = useGlobalContext();
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isEditSet, setIsEditSet] = useState(false);

  const form = useForm();
  const { register, control, handleSubmit, setValue, getValues } = form;

  function handleSubmitSet(data) {
    setIsFinished(true); // disables 'finish set' button
    setNumFinishedSets((prev) => prev + 1); // tally to display check mark in exercise head
    checkExercise(); // display check mark in set head
    handleFinishSet(); // increment to next set

    if (index + 1 === numSets) dispatch({ type: "next-exercise" }); // if last set for exercise then go to next exercise

    const { note, ...metrics } = data;
    const formatData = {
      exerciseId: exercise.exerciseIndex,
      exerciseName: exercise.name,
      setId: set.id,
      datetime: new Date(),
      note,
      metrics,
    };

    // when editing set, create copy of tempWorkoutData with edited set having updated note and metrics data. Then dispatch to replace workoutData with this copy
    const editedWorkoutData = tempWorkoutData.map((oldSet) =>
      oldSet.setId === set.id ? { ...oldSet, note, metrics } : oldSet
    );

    if (isEditSet) {
      dispatch({
        type: "edit-temp-set-data",
        payload: editedWorkoutData,
      });
    } else dispatch({ type: "submit-set-data", payload: formatData });
  }

  return (
    <Accordion.Item eventKey={`${index - 1 + activeKey}`}>
      <Accordion.Header style={canToggle ? {} : { pointerEvents: "none" }}>
        <span className="d-flex justify-content-between w-100 px-1">
          <span
            className={
              isFinished ? "text-secondary" : canToggle ? "fw-bold" : ""
            }
          >
            {isFinished && (
              <BsCheckSquareFill style={{ color: "var(--bs-blue)" }} />
            )}{" "}
            Set {index + 1}
          </span>
        </span>
      </Accordion.Header>
      <Accordion.Body style={{ backgroundColor: "var(--bs-gray-200)" }}>
        <form onSubmit={handleSubmit(handleSubmitSet)}>
          <SetBody
            set={set}
            exercise={exercise}
            register={register}
            setValue={setValue}
            getValues={getValues}
            isFinished={isFinished}
            isUnlocked={isUnlocked}
          />
          {isNoteVisible && (
            <SetNote
              register={register}
              isFinished={isFinished}
              isUnlocked={isUnlocked}
            />
          )}
          <SetButtons
            isNoteVisible={isNoteVisible}
            setIsNoteVisible={setIsNoteVisible}
            isFinished={isFinished}
            isUnlocked={isUnlocked}
            setIsUnlocked={setIsUnlocked}
            setIsEditSet={setIsEditSet}
          />
        </form>
        <DevTool control={control} />
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoSet;
