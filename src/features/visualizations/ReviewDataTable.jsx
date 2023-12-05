import Table from "react-bootstrap/Table";
import DataRow from "./DataRow";
import { useGlobalContext } from "../../context/GlobalContext";

// The main goal is to get all the records from the last workout that match the provided exercise prop. All records from the last workout are stored in the tempWorkoutData, but we actually want to render the permanently stored data in workoutData. So first we filter the tempWorkoutData to match the exercise, then compress it to a list or datetimes. Then we filter the workoutData by these datetimes to get the final exerciseData that we render to the table.

function ReviewDataTable({ exercise }) {
  const { tempWorkoutData, workoutData } = useGlobalContext();
  // filter tempWorkoutData that matches exercise & get list of datetimes
  const tempExerciseData = tempWorkoutData
    .filter((set) => set.exerciseId === exercise.id)
    .map((set) => set.datetime);
  // Get matching records in permanent workoutData based on datetime
  const exerciseData = workoutData.filter((set) =>
    tempExerciseData.includes(set.datetime)
  );

  return (
    <>
      <h2 className="text-center fw-normal fs-3">{exercise.name}</h2>
      <Table striped bordered>
        <thead className="text-center">
          <tr>
            <th>Time</th>
            {/* Headers for metrics */}
            {exercise.metrics.map((metric) => (
              <th key={metric.name} className="text-capitalize">
                {metric.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exerciseData.map((set, index) => (
            <DataRow set={set} isDate={false} key={index} exercise={exercise} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ReviewDataTable;
