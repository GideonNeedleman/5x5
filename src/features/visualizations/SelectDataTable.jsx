import Table from "react-bootstrap/Table";
import DataRow from "./DataRow";
import { useGlobalContext } from "../../context/GlobalContext";
import dayjs from "dayjs";

function SelectDataTable({ exerciseId }) {
  const { workoutData, exerciseData } = useGlobalContext();
  // match exercise name, sort reverse chronological order
  const setData = workoutData
    .filter((set) => set.exerciseId === exerciseId)
    .sort((a, b) => dayjs(b.datetime).unix() - dayjs(a.datetime).unix());
  const exercise = exerciseData.filter(
    (exercise) => exercise.id === exerciseId
  )[0];

  console.log(exercise);
  console.log(exercise.metrics);

  return (
    <>
      <Table striped bordered key={exercise.name}>
        <thead className="text-center">
          <tr>
            <th>Date</th>
            {/* Headers for metrics */}
            {exercise.metrics.map((metric) => (
              <th key={metric.name} className="text-capitalize">
                {metric.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {setData.map((set, index) => (
            <DataRow set={set} key={index} exercise={exercise} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default SelectDataTable;
