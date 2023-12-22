import { Accordion, Button } from "react-bootstrap";
import DoExercise from "./DoExercise";
import { useGlobalContext } from "../../context/GlobalContext";
import AddExerciseModal from "../builder/AddExerciseModal";
import { useState } from "react";

function WorkoutAccordion({
  workout,
  activeKey,
  setNumFinishedExercises,
  setExpandedWorkout,
}) {
  const { exerciseData } = useGlobalContext();
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  function handleAddExercise() {
    // const newExercise = new exercise
    // const newExercisesArray = [...expandedWorkout.exercises, newExercise]
    // setExpandedWorkout({...expandedWorkout, exercises: newExercisesArray})
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
          />
        ))}
      </Accordion>
      <div className="d-flex justify-content-center">
        <Button
          onClick={() => setShowAddExerciseModal(true)}
          className="mt-3 w-50"
          variant="outline-primary"
        >
          Add Exercise
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
