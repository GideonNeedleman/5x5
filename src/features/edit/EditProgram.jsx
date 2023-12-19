import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import BuildProgram from "../builder/BuildProgram";

function EditProgram() {
  const { programData } = useGlobalContext();
  const { id } = useParams();
  const program = programData.find((el) => el.id === Number(id));

  return (
    <main>
      <h1 className="text-center display-3">Edit {program.name}</h1>
      <BuildProgram edit={true} programToEdit={program} />
    </main>
  );
}

export default EditProgram;
