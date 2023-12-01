import { useState } from "react";
import { BsArrowReturnRight, BsThreeDotsVertical } from "react-icons/bs";
import { IconContext } from "react-icons";
import dayjs from "dayjs";
import RowMenuModal from "./RowMenuModal";

function DataRow({ set, isDate = true }) {
  const [isShowNote, setIsShowNote] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const date = dayjs(set.datetime).format("ddd M/D");
  const time = dayjs(set.datetime).format("h:mm a");
  const numCols = set.metrics.length + 1;

  function editSet() {
    //add modal with modified SetBody to edit & delete set
  }

  console.log(set);

  return (
    <>
      <tr className="text-center">
        <td className="text-start">
          <IconContext.Provider
            value={
              isShowNote
                ? {
                    color: "var(--bs-secondary)",
                  }
                : {
                    color: "var(--bs-primary)",
                  }
            }
          >
            <BsThreeDotsVertical
              className="me-2"
              onClick={() => setIsShowModal(true)}
            />
          </IconContext.Provider>
          {isDate ? date : time}
        </td>
        {/* Possible bug if order of metrics in set object !== order of metrics in exercise object used to set header. */}
        {set.metrics.map((metric) => (
          <td key={metric.name}>{metric.value}</td>
        ))}
        {/* <td>
          {set.note && (
            <IconContext.Provider
              value={{
                color: "var(--bs-primary)",
                size: "1.2em",
              }}
            >
              <BsStickyFill
                onClick={() => setIsShowNote((prev) => !prev)}
                style={{ cursor: "pointer" }}
              />
            </IconContext.Provider>
          )}
        </td> */}
      </tr>
      {set.note && isShowNote && (
        <tr>
          <td colSpan={numCols}>
            <IconContext.Provider
              value={{
                color: "var(--bs-primary)",
                size: "1.2em",
              }}
            >
              <BsArrowReturnRight
                className="mx-2"
                onClick={() => setIsShowNote(false)}
              />
            </IconContext.Provider>
            {set.note}
          </td>
        </tr>
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
