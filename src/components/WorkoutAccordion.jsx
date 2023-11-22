import { Accordion } from "react-bootstrap";
import DoExercise from "./DoExercise";

function WorkoutAccordion({
  workout,
  numExercises,
  activeKey,
  setNumFinishedExercises,
  register,
}) {
  return (
    <Accordion defaultActiveKey={`0`}>
      {workout.exercises.map((exercise, index) => (
        <DoExercise
          exercise={exercise}
          numExercises={numExercises}
          index={index}
          tracker={index + activeKey}
          key={exercise.name}
          setNumFinishedExercises={setNumFinishedExercises}
          register={register}
        />
      ))}
    </Accordion>
  );
}

export default WorkoutAccordion;
