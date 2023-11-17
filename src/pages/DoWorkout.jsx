import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useFinishWorkout } from "../hooks/useFinishWorkout";
import ConfirmFinishWorkoutModal from "../components/ConfirmFinishWorkoutModal";
import ConfirmCancelWorkoutModal from "../components/ConfirmCancelWorkoutModal";
import BeginWorkoutButtons from "../components/BeginWorkoutButtons";
import FinishWorkoutButtons from "../components/FinishWorkoutButtons";
import WorkoutAccordion from "../components/WorkoutAccordion";
import WorkoutTable from "../components/WorkoutTable";

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
  const handleFinishWorkout = useFinishWorkout();

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

  useEffect(() => {
    if (numFinishedExercises === numExercises) setIsWorkoutFinished(true);
  }, [numFinishedExercises, numExercises]);

  return (
    <main>
      <h1 className="display-3 text-center">{workout.name} </h1>

      <BeginWorkoutButtons
        isWorkoutStarted={isWorkoutStarted}
        handleBack={handleBack}
        handleBeginWorkout={handleBeginWorkout}
      />

      {isWorkoutStarted ? (
        <WorkoutAccordion
          workout={workout}
          numExercises={numExercises}
          activeKey={activeKey}
          setNumFinishedExercises={setNumFinishedExercises}
        />
      ) : (
        <WorkoutTable workout={workout} />
      )}

      <FinishWorkoutButtons
        isWorkoutStarted={isWorkoutStarted}
        isWorkoutFinished={isWorkoutFinished}
        handleFinishWorkout={handleFinishWorkout}
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
    </main>
  );
}

export default DoWorkout;
