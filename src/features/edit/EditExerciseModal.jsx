import Modal from "react-bootstrap/Modal";
import BuildExercise from "../builder/BuildExercise";
// import { useState } from "react";

function EditExerciseModal({
  onHide,
  show,
  exerciseToEdit,
  // workoutInProgress,
  handleAddExercise,
  // hideAddExerciseModal,
}) {
  function resetAndHide() {
    onHide();
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
        <BuildExercise
          onHide={resetAndHide}
          workoutInProgress={false}
          // hideAddExerciseModal={hideAddExerciseModal}
          edit={true}
          exerciseToEdit={exerciseToEdit}
          handleAddExercise={handleAddExercise}
        />
      </Modal.Body>
    </Modal>
  );
}

export default EditExerciseModal;
