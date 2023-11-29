import { useState } from "react";
import { BsStickyFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import dayjs from "dayjs";

function DataRow({ set }) {
  const [isShowNote, setIsShowNote] = useState(false);
  const date = dayjs(set.datetime).format("ddd M/D");
  const numCols = 5;

  return (
    <>
      <tr className="text-center">
        <td>{date}</td>
        <td>{set.exerciseName}</td>
        <td>{set.metrics.weight}</td>
        <td>{set.metrics.reps}</td>
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
