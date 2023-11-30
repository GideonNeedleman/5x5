import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../context/GlobalContext";
import SelectDataTable from "../features/visualizations/SelectDataTable";

function History() {
  const { workoutData } = useGlobalContext();
  const exerciseList = [
    ...new Set(workoutData.map((element) => element.exerciseName)),
  ].sort();
  const [chosenExercise, setChosenExercise] = useState(exerciseList[0]);

  return (
    <main>
      <h1 className="text-center">History</h1>
      <div className="px-2">
        <Form.Select
          className="my-2 fs-3"
          name="selectedExercise"
          value={chosenExercise}
          onChange={(e) => setChosenExercise(e.target.value)}
        >
          {exerciseList.map((exercise, index) => (
            <option value={exercise} key={index + 1} className="text-center">
              {exercise}
            </option>
          ))}
        </Form.Select>
      </div>
      <SelectDataTable exercise={chosenExercise} />
    </main>
  );
}

export default History;
