import Table from "react-bootstrap/Table";
import DataRow from "./DataRow";
import { useGlobalContext } from "../../context/GlobalContext";
import dayjs from "dayjs";

// data is an array of set records: exerciseId,(exerciseType,) exerciseName, datetime, metrics, note

const now = dayjs(new Date());
const HOURS_TO_INCLUDE = 6;

function ReviewDataTable({ exercise }) {
  const { workoutData } = useGlobalContext();
  // Only include data that matches exercise and was logged within certain number of hours ago
  const exerciseData = workoutData.filter(
    (set) =>
      set.exerciseName === exercise.name &&
      now.diff(dayjs(set.datetime), "hour") < HOURS_TO_INCLUDE
  );

  return (
    <>
      <h2 className="text-center fw-normal fs-3">{exercise.name}</h2>
      <Table striped bordered>
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

export default ReviewDataTable;
