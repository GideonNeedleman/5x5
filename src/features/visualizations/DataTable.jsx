import Table from "react-bootstrap/Table";
import DataRow from "./DataRow";
import { useGlobalContext } from "../../context/GlobalContext";

// data is an array of set records: exerciseId, (exerciseType,) datetime, metrics, note

function DataTable({ exercise }) {
  console.log(exercise);
  const { workoutData } = useGlobalContext();
  return (
    <>
      <h2 className="text-center">{exercise.name}</h2>
      <Table striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>Date</th>
            {exercise.metrics.map((metric) => (
              <th key={metric.name} className="text-capitalize">
                {metric.name}
              </th>
            ))}

            <th>Note</th>
          </tr>
        </thead>
        {/* <tbody>
          {workoutData.map((set, index) => (
            <DataRow set={set} key={index} />
          ))}
        </tbody> */}
      </Table>
    </>
  );
}

export default DataTable;
