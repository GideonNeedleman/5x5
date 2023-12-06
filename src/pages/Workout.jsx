import { useGlobalContext } from "../context/GlobalContext";
import DoWorkout from "./DoWorkout";
import SelectWorkout from "./SelectWorkout";

function Workout() {
  const { activeProgramId } = useGlobalContext();
  return <>{activeProgramId ? <DoWorkout /> : <SelectWorkout />}</>;
}

export default Workout;
