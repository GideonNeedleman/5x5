import Table from "react-bootstrap/Table";
import { objectToArray } from "../../utils/helpers";
import { useGlobalContext } from "../../context/GlobalContext";

export default function WorkoutTable({ workout }) {
  const { programData } = useGlobalContext();
  console.log(programData);
  return (
    <>
      {/* <h2 className="text-center fw-medium mt-1">Preview Workout</h2> */}
      <div className="mt-2">
        {workout.exercises.map((exercise) => (
          <div key={exercise.id}>
            <h3 className="text-center fw-normal">{exercise.name}</h3>
            <ExerciseTable exercise={exercise} />
          </div>
        ))}
      </div>
    </>
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
  return (
    <tr className="text-center">
      <td>{index + 1}</td>
      {metricsArray.map((metric) => (
        <td key={metric.name}>{metric.value}</td>
      ))}
    </tr>
  );
}
