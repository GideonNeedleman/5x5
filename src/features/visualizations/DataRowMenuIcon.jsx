import { IconContext } from "react-icons";
import { BsThreeDotsVertical, BsStickyFill } from "react-icons/bs";

function DataRowMenuIcon({ isShowNote, setIsShowMenuModal, setIsShowNote }) {
  return (
    <>
      {isShowNote ? (
        <IconContext.Provider value={{ color: "var(--bs-dark)" }}>
          <BsThreeDotsVertical
            className="me-2"
            onClick={() => setIsShowMenuModal(true)}
            style={{ cursor: "pointer" }}
          />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider
          value={{
            color: "var(--bs-primary)",
            size: "1.2em",
          }}
        >
          <BsStickyFill
            className="me-1"
            onClick={() => setIsShowNote((prev) => !prev)}
            style={{ cursor: "pointer" }}
          />
        </IconContext.Provider>
      )}
    </>
  );
}

export default DataRowMenuIcon;
