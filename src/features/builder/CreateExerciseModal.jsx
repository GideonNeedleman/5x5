import Modal from "react-bootstrap/Modal";
import BuildExercise from "./BuildExercise";
// import { useState } from "react";
// import ExercisePresets from "./ExercisePresets";

function CreateExerciseModal({
  onHide,
  show,
  workoutInProgress,
  hideAddExerciseModal,
  handleAddExercise,
  chosenPreset,
}) {
  /*   function resetAndHide() {
    onHide();
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
        <BuildExercise
          onHide={onHide}
          workoutInProgress={workoutInProgress}
          hideAddExerciseModal={hideAddExerciseModal}
          handleAddExercise={handleAddExercise}
          defaultSetup={chosenPreset}
        />
      </Modal.Body>
    </Modal>
  );
}

export default CreateExerciseModal;
