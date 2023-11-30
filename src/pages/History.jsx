import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import DataTable from "../features/visualizations/DataTable";
import { useGlobalContext } from "../context/GlobalContext";
import SelectDataTable from "../features/visualizations/SelectDataTable";
import Button from "react-bootstrap/Button";

function History() {
  const { mostRecentWorkout, workoutData } = useGlobalContext();
  const exerciseList = [
    ...new Set(workoutData.map((element) => element.exerciseName)),
  ].sort();
  const [chosenExercise, setChosenExercise] = useState(exerciseList[0]);
  const [showMostRecentWorkout, setShowMostRecentWorkout] = useState(false);

  useEffect(() => {
    mostRecentWorkout ? setShowMostRecentWorkout(true) : "";
  }, [mostRecentWorkout]);

  return (
    <main>
      {!showMostRecentWorkout && (
        <>
          <h1 className="text-center">History</h1>
          <div className="px-2">
            <Form.Select
              className="my-2"
              name="selectedExercise"
              value={chosenExercise}
              onChange={(e) => setChosenExercise(e.target.value)}
            >
              {exerciseList.map((exercise, index) => (
                <option
                  value={exercise}
                  key={index + 1}
                  className="text-center"
                >
                  {exercise}
                </option>
              ))}
            </Form.Select>
          </div>
          <SelectDataTable exercise={chosenExercise} />
        </>
      )}

      {mostRecentWorkout && showMostRecentWorkout && (
        <>
          <div className="text-start">
            <Button
              className="m-2"
              onClick={() => setShowMostRecentWorkout(false)}
            >
              View more exercises
            </Button>
          </div>
          {/* <h1 className="text-center">Most Recent Workout</h1> */}
          {mostRecentWorkout.exercises.map((exercise) => (
            <DataTable exercise={exercise} key={exercise.id} />
          ))}
        </>
      )}
    </main>
  );
}

export default History;
