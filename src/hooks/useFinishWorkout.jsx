import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

export function useFinishWorkout() {
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();
  // need to take in active workout so I know how to increment next workout flag.

  function finishWorkout() {
    dispatch({ type: "finish-workout" });
    navigate("/history");
  }

  return finishWorkout;
}
