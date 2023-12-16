import { useGlobalContext } from "../context/GlobalContext";
import DoWorkout from "./DoWorkout";
import SelectWorkout from "./SelectWorkout";

function Workout() {
  const { activeWorkout } = useGlobalContext();
  return <>{activeWorkout ? <DoWorkout /> : <SelectWorkout />}</>;
}

export default Workout;
