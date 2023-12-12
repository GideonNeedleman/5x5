import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../context/GlobalContext";
import SelectDataTable from "../features/visualizations/SelectDataTable";

function History() {
  const { recordData, exerciseData } = useGlobalContext();

  // list of exerciseIds in recordData
  const exerciseIds = [
    ...new Set(recordData.map((set) => set.exerciseId)),
  ].sort();

  // list of matching exercises
  const exercises = exerciseData.filter((exercise) =>
    exerciseIds.includes(exercise.id)
  );

  // select field option value
  const [chosenExerciseId, setChosenExerciseId] = useState(exercises[0].id);

  return (
    <main>
      <h1 className="text-center display-3">History</h1>
      <div className="px-2">
        <Form.Select
          className="my-2 fs-3"
          name="selectedExercise"
          value={chosenExerciseId}
          onChange={(e) => setChosenExerciseId(Number(e.target.value))}
        >
          {exercises.map((exercise, index) => (
            <option value={exercise.id} key={index + 1} className="text-center">
              {exercise.name}
            </option>
          ))}
        </Form.Select>
      </div>
      <SelectDataTable exerciseId={chosenExerciseId} key={chosenExerciseId} />
    </main>
  );
}

export default History;
