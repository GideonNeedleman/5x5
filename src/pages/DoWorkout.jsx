import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context/GlobalContext";
import ConfirmFinishWorkoutModal from "../features/workout/ConfirmFinishWorkoutModal";
import ConfirmCancelWorkoutModal from "../features/workout/ConfirmCancelWorkoutModal";
import BeginWorkoutButtons from "../features/workout/BeginWorkoutButtons";
import FinishWorkoutButtons from "../features/workout/FinishWorkoutButtons";
import WorkoutAccordion from "../features/workout/WorkoutAccordion";
import WorkoutTable from "../features/workout/WorkoutTable";
// import SaveModal from "../features/workout/SaveModal";
import { Form } from "react-bootstrap";

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
  // console.log("save workout modal", showSaveModal);

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

      {justGo && (
        <Form.Group className="px-2 mt-3 pb-2 bg-primary-subtle">
          <Form.Label className="mb-1" htmlFor="workoutName">
            Enter name to save workout for future use
          </Form.Label>
          <Form.Control
            type="text"
            id="workoutName"
            placeholder="Workout name"
            className=""
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </Form.Group>
      )}

      <FinishWorkoutButtons
        isWorkoutStarted={isWorkoutStarted}
        isWorkoutFinished={isWorkoutFinished}
        handleCancelModal={handleCancelModal}
        handleConfirmationModal={handleConfirmationModal}
        justGo={justGo}
        newWorkout={newWorkout}
      />

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

      {/*       <SaveModal
        show={showSaveModal}
        workout={expandedWorkout}
        // onHide={() => setShowSaveModal(false)}
        // handleClose={handleBack}
      /> */}
    </>
  );
}

export default DoWorkout;
