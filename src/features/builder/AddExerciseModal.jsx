import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import vibrator from "vibrator";
import { useGlobalContext } from "../../context/GlobalContext";
import { Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import CreateExerciseModal from "./CreateExerciseModal";
import { BsSearch } from "react-icons/bs";

function AddExerciseModal({
  onHide,
  show,
  workout,
  handleAddExercise,
  workoutInProgress = false,
}) {
  const { exerciseData } = useGlobalContext();
  const [includeExistingExercises, setIncludeExistingExercises] =
    useState(false);
  const [showCreateExerciseModal, setShowCreateExerciseModal] = useState(false);

  // get temp list of all exercise ids
  let tempExerciseIds = [];
  for (let i = 0; i < workout.exercises.length; i++) {
    tempExerciseIds = [...tempExerciseIds, workout.exercises[i].id];
  }

  // now apply search filter
  const [searchTerm, setSearchTerm] = useState("");
  // const searchedExercises = exerciseData.filter()

  // sort exercises alphabetically
  const sortedExercises = exerciseData.sort((a, b) => {
    if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
  });

  // filter out exercise ids already in workout and list alphabetically
  const filteredExercises = sortedExercises.filter(
    (exercise) => !tempExerciseIds.includes(exercise.id)
  );

  const exercisesToMap = includeExistingExercises
    ? sortedExercises
    : filteredExercises;

  // console.log(tempExerciseIds);
  // console.log(filteredExercises);

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h3 className="display-4 text-center">Add Exercise</h3>

          <div className="d-flex flex-column gap-2">
            {/* Input search to filter list */}
            <InputGroup>
              <InputGroup.Text>
                <BsSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            {/* Checkbox to include existing exercises */}
            <InputGroup className="d-flex justify-content-center">
              <InputGroup.Checkbox
                checked={includeExistingExercises}
                onChange={() => setIncludeExistingExercises((prev) => !prev)}
                id="checkbox"
              />
              <label htmlFor="checkbox">
                <InputGroup.Text className="fst-italic">
                  Include existing exercises
                </InputGroup.Text>
              </label>
            </InputGroup>
            <Button
              onClick={() => {
                setShowCreateExerciseModal(true);
                vibrator(1);
              }}
            >
              Create New Exercise
            </Button>
            {exercisesToMap.map((exercise, index) => (
              <Button
                onClick={() => {
                  handleAddExercise(exercise);
                  vibrator(1);
                }}
                variant="outline-dark"
                key={index}
              >
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
        </Modal.Footer>
      </Modal>
      <CreateExerciseModal
        show={showCreateExerciseModal}
        onHide={() => setShowCreateExerciseModal(false)}
        workoutInProgress={workoutInProgress}
        hideAddExerciseModal={onHide}
        handleAddExercise={handleAddExercise}
      />
    </>
  );
}

export default AddExerciseModal;
