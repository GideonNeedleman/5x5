import Modal from "react-bootstrap/Modal";
import BuildExercise from "./BuildExercise";

function CreateExerciseModal({
  onHide,
  show,
  workoutInProgress,
  hideAddExerciseModal,
  handleAddExercise,
}) {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <BuildExercise
          onHide={onHide}
          workoutInProgress={workoutInProgress}
          hideAddExerciseModal={hideAddExerciseModal}
          handleAddExercise={handleAddExercise}
        />
      </Modal.Body>
    </Modal>
  );
}

export default CreateExerciseModal;
