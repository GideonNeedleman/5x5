import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import BuildWorkout from "../builder/BuildWorkout";

function EditWorkout() {
  const { workoutData } = useGlobalContext();
  const { id } = useParams();
  const workout = workoutData.find((el) => el.id === Number(id));

  return (
    <main>
      <h1 className="text-center display-3">Edit {workout.name}</h1>
      <BuildWorkout edit={true} workoutToEdit={workout} />
    </main>
  );
}

export default EditWorkout;
