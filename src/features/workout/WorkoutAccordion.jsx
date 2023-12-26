import { Accordion, Button } from "react-bootstrap";
import DoExercise from "./DoExercise";
import { useGlobalContext } from "../../context/GlobalContext";
import AddExerciseModal from "../builder/AddExerciseModal";
import { useState } from "react";
import vibrator from "vibrator";

function WorkoutAccordion({
  workout,
  activeKey,
  setNumFinishedExercises,
  expandedWorkout,
  setExpandedWorkout,
}) {
  const { exerciseData } = useGlobalContext();
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  function handleAddExercise(exercise) {
    vibrator(1);
    setShowAddExerciseModal(false);
    // need to build firs set for new exercise from exercise metrics defaults
    // set needs id & metrics object
    const newId = Math.floor(Math.random() * 1000000);
    let newMetrics = {};
    for (let i = 0; i < exercise.metrics.length; i++) {
      const key = exercise.metrics[i].name;
      const value = exercise.metrics[i].default;
      newMetrics = { ...newMetrics, [key]: value };
    }
    const firstSet = { id: newId, metrics: newMetrics };
    // add sets array to exercise
    const newExercise = { ...exercise, sets: [firstSet] };
    // add exercise to exercises array
    const newExercisesArray = [...expandedWorkout.exercises, newExercise];
    // update exercises array in expandedWorkout
    setExpandedWorkout({ ...expandedWorkout, exercises: newExercisesArray });
  }

  return (
    <>
      <Accordion defaultActiveKey={`0`}>
        {workout.exercises.map((exercise, index) => (
          <DoExercise
            exercise={exerciseData.find((el) => el.id === exercise.id)}
            sets={exercise.sets}
            index={index}
            tracker={index + activeKey}
            key={index}
            setNumFinishedExercises={setNumFinishedExercises}
            expandedWorkout={expandedWorkout}
            setExpandedWorkout={setExpandedWorkout}
          />
        ))}
      </Accordion>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => setShowAddExerciseModal(true)}
          className="mt-3 w-50"
          variant="outline-primary"
        >
          + Add Exercise
        </Button>
      </div>
      <AddExerciseModal
        show={showAddExerciseModal}
        onHide={() => setShowAddExerciseModal(false)}
        workout={workout}
        handleAddExercise={handleAddExercise}
      />
    </>
  );
}

export default WorkoutAccordion;
