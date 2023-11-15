import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export function useFinishWorkout() {
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  function finishWorkout() {
    dispatch({ type: "finish-workout" });
    navigate("/history");
  }

  return finishWorkout;
}
