import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { useGlobalContext } from "../context/GlobalContext";
import ConfirmFinishWorkoutModal from "../components/ConfirmFinishWorkoutModal";
import ConfirmCancelWorkoutModal from "../components/ConfirmCancelWorkoutModal";
import BeginWorkoutButtons from "../components/BeginWorkoutButtons";
import FinishWorkoutButtons from "../components/FinishWorkoutButtons";
import WorkoutAccordion from "../components/WorkoutAccordion";
import WorkoutTable from "../components/WorkoutTable";
import { getDefaultValues } from "../utils/helpers";

function DoWorkout() {
  const {
    activeWorkout: workout,
    isWorkoutStarted,
    activeKey,
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [numFinishedExercises, setNumFinishedExercises] = useState(0);
  const numExercises = workout.exercises.length;
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);

  /*   To set defaultValues:
  1. generate array of all sets?
  2. map array => `weight-${set.id}`: set.weight, `reps-${set.id}`: set.reps
  3. create defaultValues: {...array}

  maybe generate defaultValues object with a function:
  const form = useForm({ defaultValues: getDefaultValues(workout) });

  include rest time values? could do restTime=set.time? || 90000*/
  const form = useForm({
    defaultValues: getDefaultValues(workout),
  });
  const { register, control, handleSubmit, setValue, getValues } = form;

  function handleBack() {
    dispatch({ type: "clear-workout" });
    navigate("/");
  }

  function handleBeginWorkout() {
    dispatch({ type: "begin-workout" });
  }

  function handleConfirmationModal() {
    setShow(true);
  }

  function handleCancelModal() {
    setShowCancelModal(true);
  }

  function handleFinishWorkout(data) {
    dispatch({ type: "finish-workout", payload: data });
    console.log("Form submitted", data);
    navigate("/");
  }

  useEffect(() => {
    if (numFinishedExercises === numExercises) setIsWorkoutFinished(true);
  }, [numFinishedExercises, numExercises]);

  return (
    <>
      <form id="workoutForm" onSubmit={handleSubmit(handleFinishWorkout)}>
        <h1 className="display-3 text-center">{workout.name} </h1>

        <BeginWorkoutButtons
          isWorkoutStarted={isWorkoutStarted}
          handleBack={handleBack}
          handleBeginWorkout={handleBeginWorkout}
        />

        {isWorkoutStarted ? (
          <WorkoutAccordion
            workout={workout}
            activeKey={activeKey}
            setNumFinishedExercises={setNumFinishedExercises}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        ) : (
          <WorkoutTable workout={workout} />
        )}

        <FinishWorkoutButtons
          isWorkoutStarted={isWorkoutStarted}
          isWorkoutFinished={isWorkoutFinished}
          handleCancelModal={handleCancelModal}
          handleConfirmationModal={handleConfirmationModal}
        />

        <ConfirmFinishWorkoutModal
          show={show}
          onHide={() => setShow(false)}
          handleClose={handleFinishWorkout}
        />

        <ConfirmCancelWorkoutModal
          show={showCancelModal}
          onHide={() => setShowCancelModal(false)}
          handleClose={handleBack}
        />
      </form>
      <DevTool control={control} />
    </>
  );
}

export default DoWorkout;
