import Table from "react-bootstrap/Table";
import { objectToArray } from "../../utils/helpers";
import { useGlobalContext } from "../../context/GlobalContext";

export default function WorkoutTable({ workout }) {
  const { exerciseData } = useGlobalContext();
  return (
    <>
      <div className="mt-2">
        {workout.exercises.map((exercise, index) => (
          <div key={index}>
            <h3 className="text-center fw-normal">
              {exerciseData.find((el) => el.id === exercise.id).name}
            </h3>
            <ExerciseTable
              exercise={exerciseData.find((el) => el.id === exercise.id)}
              sets={exercise.sets}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function ExerciseTable({ exercise, sets }) {
  return (
    <Table striped bordered hover>
      <thead className="text-center">
        <tr>
          <th>Set</th>
          {exercise.metrics.map((metric) => (
            <th key={metric.name} className="text-capitalize">
              {metric.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sets.map((set, index) => (
          <SetRow set={set} index={index} key={index} />
        ))}
      </tbody>
    </Table>
  );
}

function SetRow({ set, index }) {
  const metricsArray = objectToArray(set.metrics);
  return (
    <tr className="text-center">
      <td>{index + 1}</td>
      {metricsArray.map((metric) => (
        <td key={metric.name}>{metric.value}</td>
      ))}
    </tr>
  );
}
