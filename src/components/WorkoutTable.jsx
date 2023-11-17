import Table from "react-bootstrap/Table";

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
          {exercise.sets[0].weight && <th>Weight</th>}
          <th>Reps</th>
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
  return (
    <tr className="text-center">
      <td>{index + 1}</td>
      {set.weight && <td>{set.weight}</td>}
      <td>{set.reps}</td>
    </tr>
  );
}
