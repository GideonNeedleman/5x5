import Table from "react-bootstrap/Table";
import { objectToArray } from "../../utils/helpers";

export default function WorkoutTable({ workout }) {
  return (
    <div className="mt-3">
      {workout.exercises.map((exercise) => (
        <div key={exercise.id}>
          <h2 className="text-center fw-normal">{exercise.name}</h2>
          <ExerciseTable exercise={exercise} />
        </div>
      ))}
    </div>
  );
}

function ExerciseTable({ exercise }) {
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
        {exercise.sets.map((set, index) => (
          <SetRow set={set} index={index} key={index} />
        ))}
      </tbody>
    </Table>
  );
}

function SetRow({ set, index }) {
  const metricsArray = objectToArray(set.metrics);
  console.log(metricsArray);
  return (
    <tr className="text-center">
      <td>{index + 1}</td>
      {metricsArray.map((metric) => (
        <td key={metric.name}>{metric.value}</td>
      ))}
    </tr>
  );
}
