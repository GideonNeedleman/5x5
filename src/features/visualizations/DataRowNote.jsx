import { IconContext } from "react-icons";
import { BsArrowReturnRight } from "react-icons/bs";
import vibrator from "vibrator";

function DataRowNote({ numCols, setIsShowNote, note }) {
  return (
    <tr
      onClick={() => {
        setIsShowNote(false);
        vibrator(1);
      }}
    >
      <td colSpan={numCols}>
        <IconContext.Provider
          value={{
            color: "var(--bs-primary)",
            size: "1.2em",
          }}
        >
          <BsArrowReturnRight className="mx-2" />
        </IconContext.Provider>
        {note}
      </td>
    </tr>
  );
}

export default DataRowNote;
