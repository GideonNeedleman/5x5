import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context/GlobalContext";
import ConfirmFinishWorkoutModal from "../features/workout/ConfirmFinishWorkoutModal";
import ConfirmCancelWorkoutModal from "../features/workout/ConfirmCancelWorkoutModal";
import BeginWorkoutButtons from "../features/workout/BeginWorkoutButtons";
import FinishWorkoutButtons from "../features/workout/FinishWorkoutButtons";
import WorkoutAccordion from "../features/workout/WorkoutAccordion";
import WorkoutTable from "../features/workout/WorkoutTable";
import SaveWorkoutName from "../features/workout/SaveWorkoutName";

function DoWorkout({ justGo = false }) {
  const {
    activeWorkout: workout,
    isWorkoutStarted,
    activeKey,
    workoutData,
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [numFinishedExercises, setNumFinishedExercises] = useState(0);
  //maybe can just use straight workout (activeWorkout) since it's a deep copy of workoutData?
  const [expandedWorkout, setExpandedWorkout] = useState(workout);
  const numExercises = expandedWorkout.exercises.length;
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [workoutName, setWorkoutName] = useState();
  const newWorkout = {
    ...expandedWorkout,
    name: workoutName,
    id: workoutData.length + 1,
  };

  console.log("new workout", newWorkout);

  function handleBack() {
    dispatch({ type: "clear-workout" });
    navigate("/");
  }

  function handleBeginWorkout() {
    dispatch({ type: "begin-workout" });
  }

  function handleConfirmationModal() {
    setShowConfirmationModal(true);
  }

  function handleCancelModal() {
    setShowCancelModal(true);
  }

  useEffect(() => {
    if (numFinishedExercises === numExercises) setIsWorkoutFinished(true);
    else setIsWorkoutFinished(false);
  }, [numFinishedExercises, numExercises]);

  return (
    <>
      {isWorkoutStarted ? (
        <h1 className="display-3 text-center">{workout.name} </h1>
      ) : (
        <h1 className="text-center display-3">Preview {workout.name}</h1>
      )}
      <BeginWorkoutButtons
        isWorkoutStarted={isWorkoutStarted}
        handleBack={handleBack}
        handleBeginWorkout={handleBeginWorkout}
      />

      {isWorkoutStarted ? (
        <WorkoutAccordion
          workout={expandedWorkout}
          activeKey={activeKey}
          setNumFinishedExercises={setNumFinishedExercises}
          expandedWorkout={expandedWorkout}
          setExpandedWorkout={setExpandedWorkout}
        />
      ) : (
        <WorkoutTable workout={workout} />
      )}

      <FinishWorkoutButtons
        isWorkoutStarted={isWorkoutStarted}
        isWorkoutFinished={isWorkoutFinished}
        handleCancelModal={handleCancelModal}
        handleConfirmationModal={handleConfirmationModal}
        justGo={justGo}
        newWorkout={newWorkout}
      />

      {justGo && newWorkout.exercises.length > 0 && (
        <SaveWorkoutName
          workoutName={workoutName}
          setWorkoutName={setWorkoutName}
        />
      )}

      <ConfirmFinishWorkoutModal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        justGo={justGo}
        newWorkout={newWorkout}
      />

      <ConfirmCancelWorkoutModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)}
        handleClose={handleBack}
      />
    </>
  );
}

export default DoWorkout;
