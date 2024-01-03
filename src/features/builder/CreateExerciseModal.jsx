import Modal from "react-bootstrap/Modal";
import BuildExercise from "./BuildExercise";
import { useState } from "react";
import ExercisePresets from "./ExercisePresets";

function CreateExerciseModal({
  onHide,
  show,
  workoutInProgress,
  hideAddExerciseModal,
  handleAddExercise,
}) {
  const [showPresets, setShowPresets] = useState(true);
  const [chosenPreset, setChosenPreset] = useState(null);
  function resetAndHide() {
    onHide();
    setChosenPreset(null);
    setShowPresets(true);
  }

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-1">
        {showPresets ? (
          <ExercisePresets
            onHide={onHide}
            setChosenPreset={setChosenPreset}
            setShowPresets={setShowPresets}
          />
        ) : (
          <BuildExercise
            onHide={resetAndHide}
            workoutInProgress={workoutInProgress}
            hideAddExerciseModal={hideAddExerciseModal}
            handleAddExercise={handleAddExercise}
            defaultSetup={chosenPreset}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default CreateExerciseModal;
