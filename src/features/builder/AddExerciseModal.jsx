import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import vibrator from "vibrator";
import { useGlobalContext } from "../../context/GlobalContext";

function AddExerciseModal({ onHide, show, workout, handleAddExercise }) {
  const { exerciseData } = useGlobalContext();

  // get temp list of all exercise ids
  let tempExerciseIds = [];
  for (let i = 0; i < workout.exercises.length; i++) {
    tempExerciseIds = [...tempExerciseIds, workout.exercises[i].id];
  }

  // filter out exercise ids already in workout and list alphabetically
  const filteredExercises = exerciseData
    .filter((exercise) => !tempExerciseIds.includes(exercise.id))
    .sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
    });
  // .map((el) => el.id);
  // console.log(tempExerciseIds);
  console.log(filteredExercises);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h3 className="display-4 text-center">Add Exercise</h3>

        {/* Add input search to filter list */}
        <div className="d-flex flex-column gap-2">
          {filteredExercises.map((exercise, index) => (
            <Button onClick={handleAddExercise} variant="secondary" key={index}>
              {exercise.name}
            </Button>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            onHide();
            vibrator(1);
          }}
          variant="secondary"
        >
          Cancel
        </Button>
        {/* <Button
          onClick={() => {
            handleConfirm();
            vibrator(1);
          }}
        >
          Confirm
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default AddExerciseModal;
