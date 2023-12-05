import { useState } from "react";
import dayjs from "dayjs";
import RowMenuModal from "./RowMenuModal";
import DataRowMenuIcon from "./DataRowMenuIcon";
import DataRowNote from "./DataRowNote";
import EditSetModal from "./EditSetModal";
import ConfirmationModal from "./ConfirmationModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { objectToArray } from "../../utils/helpers";

function DataRow({ set, isDate = true, exercise }) {
  const [isShowNote, setIsShowNote] = useState(true);
  const [isShowMenuModal, setIsShowMenuModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);

  const date = dayjs(set.datetime).format("ddd M/D");
  const time = dayjs(set.datetime).format("h:mm a");
  const numCols = exercise.metrics.length + 1;
  const metricsArray = objectToArray(set.metrics);

  const { dispatch } = useGlobalContext();

  function deleteSet() {
    dispatch({ type: "delete-set", payload: set });
    setIsShowConfirmationModal(false);
  }

  return (
    <>
      <tr className="text-center">
        <td className="text-start">
          <DataRowMenuIcon
            setIsShowMenuModal={setIsShowMenuModal}
            isShowNote={isShowNote}
            setIsShowNote={setIsShowNote}
          />

          {isDate ? date : time}
        </td>
        {/* Ensure metrics order in set object === order in exercise object used to set header. */}
        {metricsArray.map((metric) => (
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
        show={isShowMenuModal}
        onHide={() => setIsShowMenuModal(false)}
        set={set}
        setIsShowEditModal={setIsShowEditModal}
        setIsShowConfirmationModal={setIsShowConfirmationModal}
      />
      <EditSetModal
        show={isShowEditModal}
        onHide={() => setIsShowEditModal(false)}
        set={set}
        exercise={exercise}
      />
      <ConfirmationModal
        message={`Confirm delete record`}
        show={isShowConfirmationModal}
        onHide={() => setIsShowConfirmationModal(false)}
        handleConfirm={deleteSet}
      />
    </>
  );
}

export default DataRow;
