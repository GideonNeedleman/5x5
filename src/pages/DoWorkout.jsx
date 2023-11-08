import { useGlobalContext } from "../context/GlobalContext";

function DoWorkout() {
  const { activeWorkout: workout, dispatch } = useGlobalContext();
  return <main>Do {workout.name} here</main>;
}

export default DoWorkout;
