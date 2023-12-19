import { Accordion } from "react-bootstrap";
import DoExercise from "./DoExercise";

function WorkoutAccordion({ workout, activeKey, setNumFinishedExercises }) {
  return (
    <Accordion defaultActiveKey={`0`}>
      {workout.exercises.map((exercise, index) => (
        <DoExercise
          exercise={exercise}
          index={index}
          tracker={index + activeKey}
          key={index}
          setNumFinishedExercises={setNumFinishedExercises}
        />
      ))}
    </Accordion>
  );
}

export default WorkoutAccordion;
