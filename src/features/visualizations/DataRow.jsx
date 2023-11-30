import { useState } from "react";
import { BsStickyFill, BsPencilFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import dayjs from "dayjs";

function DataRow({ set, isDate = true }) {
  const [isShowNote, setIsShowNote] = useState(false);
  const date = dayjs(set.datetime).format("ddd M/D");
  const time = dayjs(set.datetime).format("h:mm a");
  const numCols = 5;

  function editSet() {
    //add modal with modified SetBody to edit & delete set
  }

  console.log(set);

  return (
    <>
      <tr className="text-center">
        <td>
          {/* <IconContext.Provider
            value={{
              color: "var(--bs-secondary)",
            }}
          >
            <BsPencilFill className="me-2" onClick={editSet} />
          </IconContext.Provider> */}
          {isDate ? date : time}
        </td>
        {/* Possible bug if order of metrics in set object !== order of metrics in exercise object used to set header. */}
        {set.metrics.map((metric) => (
          <td key={metric.name}>{metric.value}</td>
        ))}
        <td>
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
        </td>
      </tr>
      {isShowNote && (
        <tr>
          <td colSpan={numCols} className="text-center">
            {set.note}
          </td>
        </tr>
      )}
    </>
  );
}

export default DataRow;
