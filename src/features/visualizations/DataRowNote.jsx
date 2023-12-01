import { IconContext } from "react-icons";
import { BsArrowReturnRight } from "react-icons/bs";

function DataRowNote({ numCols, setIsShowNote, note }) {
  return (
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
        {note}
      </td>
    </tr>
  );
}

export default DataRowNote;
