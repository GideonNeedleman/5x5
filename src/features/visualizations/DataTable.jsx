import Table from "react-bootstrap/Table";
import DataRow from "./DataRow";

// data is an array of set records: exerciseId, (exerciseType,) datetime, metrics, note

function DataTable({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Exercise</th>
          <th>Weight</th>
          <th>Reps</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {data.map((set, index) => (
          <DataRow set={set} key={index} />
        ))}
      </tbody>
    </Table>
  );
}

export default DataTable;
