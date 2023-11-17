import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import Accordion from "react-bootstrap/Accordion";
import { useFinishWorkout } from "../hooks/useFinishWorkout";
import DoExercise from "../components/DoExercise";
import ConfirmFinishWorkoutModal from "../components/ConfirmFinishWorkoutModal";
import ConfirmCancelWorkoutModal from "../components/ConfirmCancelWorkoutModal";
import BeginWorkoutButtons from "../components/BeginWorkoutButtons";
import FinishWorkoutButtons from "../components/FinishWorkoutButtons";

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
    console.log("finished exercises: ", numFinishedExercises);
    console.log("total exercises ", numExercises);
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

      <Accordion defaultActiveKey={`0`}>
        {workout.exercises.map((exercise, index) => (
          <DoExercise
            exercise={exercise}
            numExercises={numExercises}
            index={index}
            tracker={index + activeKey}
            key={exercise.name}
            setNumFinishedExercises={setNumFinishedExercises}
          />
        ))}
      </Accordion>

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
