import { Accordion } from "react-bootstrap";
import DoExercise from "./DoExercise";
import { useGlobalContext } from "../../context/GlobalContext";

function WorkoutAccordion({ workout, activeKey, setNumFinishedExercises }) {
  const { exerciseData } = useGlobalContext();
  return (
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
  );
}

export default WorkoutAccordion;
