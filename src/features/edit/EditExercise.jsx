import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import BuildExercise from "../builder/BuildExercise";

function EditExercise() {
  const { exerciseData } = useGlobalContext();
  const { id } = useParams();
  const exercise = exerciseData.find((el) => el.id === Number(id));

  return (
    <main>
      <h1 className="text-center display-3">Edit {exercise.name}</h1>
      <BuildExercise edit={true} exerciseToEdit={exercise} />
    </main>
  );
}

export default EditExercise;
