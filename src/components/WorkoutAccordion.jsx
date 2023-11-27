import { Accordion } from "react-bootstrap";
import DoExercise from "./DoExercise";

function WorkoutAccordion({
  workout,
  activeKey,
  setNumFinishedExercises,
  /*   register,
  setValue,
  getValues, */
}) {
  return (
    <Accordion defaultActiveKey={`0`}>
      {workout.exercises.map((exercise, index) => (
        <DoExercise
          exercise={exercise}
          index={index}
          tracker={index + activeKey}
          key={exercise.name}
          setNumFinishedExercises={setNumFinishedExercises}
          /* register={register}
          setValue={setValue}
          getValues={getValues} */
        />
      ))}
    </Accordion>
  );
}

export default WorkoutAccordion;
