import Modal from "react-bootstrap/Modal";
// import BuildExercise from "./BuildExercise";
// import { useState } from "react";
import ExercisePresets from "./ExercisePresets";

function PresetsModal({
  onHide,
  show,
  setChosenPreset,
  setShowCreateExerciseModal,
  // workoutInProgress,
  // hideAddExerciseModal,
  // handleAddExercise,
}) {
  /*   function resetAndHide() {
    onHide();
    setChosenPreset(null);
    setShowPresets(true);
  } */

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-1">
        <ExercisePresets
          onHide={onHide}
          setChosenPreset={setChosenPreset}
          setShowCreateExerciseModal={setShowCreateExerciseModal}
        />
      </Modal.Body>
    </Modal>
  );
}

export default PresetsModal;
