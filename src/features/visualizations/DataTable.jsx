import Table from "react-bootstrap/Table";
import DataRow from "./DataRow";
import { useGlobalContext } from "../../context/GlobalContext";

// data is an array of set records: exerciseId, (exerciseType,) datetime, metrics, note

function DataTable({ exercise }) {
  const { workoutData } = useGlobalContext();
  const exerciseData = workoutData.filter(
    (set) => set.exerciseName === exercise.name
  );

  return (
    <>
      <h2 className="text-center">{exercise.name}</h2>
      <Table striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>Date</th>
            {/* Headers for metrics */}
            {exercise.metrics.map((metric) => (
              <th key={metric.name} className="text-capitalize">
                {metric.name}
              </th>
            ))}
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {exerciseData.map((set, index) => (
            <DataRow set={set} key={index} />
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default DataTable;
