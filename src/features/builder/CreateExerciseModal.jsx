import Modal from "react-bootstrap/Modal";
import BuildExercise from "./BuildExercise";

function CreateExerciseModal({
  onHide,
  show,
  workoutInProgress,
  hideAddExerciseModal,
  handleAddExercise,
}) {
  const defaultSetup = [
    {
      adaptive: true,
      better: "bigger",
      default: null,
      inputBar: "NumberInputBar",
      name: "weight",
      step: 5,
      units: "lbs",
    },
    {
      adaptive: true,
      better: "bigger",
      default: null,
      inputBar: "NumberInputBar",
      name: "reps",
      step: 1,
      units: null,
    },
  ];
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-1">
        <BuildExercise
          onHide={onHide}
          workoutInProgress={workoutInProgress}
          hideAddExerciseModal={hideAddExerciseModal}
          handleAddExercise={handleAddExercise}
          defaultSetup={defaultSetup}
        />
      </Modal.Body>
    </Modal>
  );
}

export default CreateExerciseModal;
