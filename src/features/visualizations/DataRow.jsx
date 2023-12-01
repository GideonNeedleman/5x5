import { useState } from "react";
import dayjs from "dayjs";
import RowMenuModal from "./RowMenuModal";
import DataRowMenuIcon from "./DataRowMenuIcon";
import DataRowNote from "./DataRowNote";

function DataRow({ set, isDate = true }) {
  const [isShowNote, setIsShowNote] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const date = dayjs(set.datetime).format("ddd M/D");
  const time = dayjs(set.datetime).format("h:mm a");
  const numCols = set.metrics.length + 1;

  function editSet() {
    //add modal with modified SetBody to edit & delete set
  }

  function deleteSet() {}

  console.log(set);

  return (
    <>
      <tr className="text-center">
        <td className="text-start">
          <DataRowMenuIcon
            setIsShowModal={setIsShowModal}
            isShowNote={isShowNote}
            setIsShowNote={setIsShowNote}
          />

          {isDate ? date : time}
        </td>
        {/* Ensure metrics order in set object === order in exercise object used to set header. */}
        {set.metrics.map((metric) => (
          <td key={metric.name}>{metric.value}</td>
        ))}
      </tr>
      {set.note && isShowNote && (
        <DataRowNote
          numCols={numCols}
          setIsShowNote={setIsShowNote}
          note={set.note}
        />
      )}
      <RowMenuModal
        isShowNote={isShowNote}
        onShowNote={() => setIsShowNote(true)}
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
      />
    </>
  );
}

export default DataRow;
