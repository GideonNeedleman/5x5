import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import vibrator from "vibrator";
import { useGlobalContext } from "../../context/GlobalContext";
import { Form, InputGroup } from "react-bootstrap";
import { useState } from "react";
import CreateExerciseModal from "./CreateExerciseModal";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import ExerciseContextMenuModal from "./ExerciseContextMenuModal";
import EditExerciseModal from "../edit/EditExerciseModal";
import PresetsModal from "./PresetsModal";

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
  const [showExerciseContextMenuModal, setShowExerciseContextMenuModal] =
    useState(false);
  const [showEditExerciseModal, setShowEditExerciseModal] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const [showPresets, setShowPresets] = useState(false);
  const [chosenPreset, setChosenPreset] = useState();

  // get temp list of all exercise ids
  let tempExerciseIds = [];
  for (let i = 0; i < workout.exercises.length; i++) {
    tempExerciseIds = [...tempExerciseIds, workout.exercises[i].id];
  }

  // now apply search filter
  const [searchTerm, setSearchTerm] = useState("");
  const searchedExercises = exerciseData.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log(searchedExercises);

  // sort exercises alphabetically
  const sortedExercises = searchedExercises.sort((a, b) => {
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
                setShowPresets(true);
                vibrator(1);
              }}
            >
              Create New Exercise
            </Button>
            {exercisesToMap.map((exercise, index) => (
              <div key={index}>
                <Button
                  className="w-100"
                  onClick={() => {
                    handleAddExercise(exercise);
                    vibrator(1);
                  }}
                  variant="outline-dark"
                >
                  {exercise.name}
                </Button>
                <Button
                  variant="link"
                  style={{
                    position: "absolute",
                    right: "16px",
                    color: "var(--dark)",
                  }}
                  onClick={() => {
                    setShowExerciseContextMenuModal(true);
                    setExerciseToEdit(exercise);
                    // setShowEditExerciseModal(true);
                    vibrator(1);
                  }}
                >
                  <BsThreeDotsVertical />
                </Button>
              </div>
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
      <ExerciseContextMenuModal
        show={showExerciseContextMenuModal}
        onHide={() => setShowExerciseContextMenuModal(false)}
        exercise={exerciseToEdit}
        setExerciseToEdit={setExerciseToEdit}
        setShowEditExerciseModal={setShowEditExerciseModal}
        setIsEdit={setIsEdit}
      />
      {isEdit ? (
        <EditExerciseModal
          onHide={() => {
            setShowEditExerciseModal(false);
            setIsEdit(false);
          }}
          show={showEditExerciseModal}
          exerciseToEdit={exerciseToEdit}
          // workoutInProgress={false}
          // hideAddExerciseModal={onHide}
        />
      ) : (
        <PresetsModal
          onHide={() => setShowPresets(false)}
          show={showPresets}
          setChosenPreset={setChosenPreset}
          setShowCreateExerciseModal={setShowCreateExerciseModal}
        />
      )}
      <CreateExerciseModal
        show={showCreateExerciseModal}
        onHide={() => {
          setShowCreateExerciseModal(false);
          setChosenPreset();
        }}
        workoutInProgress={workoutInProgress}
        hideAddExerciseModal={onHide}
        handleAddExercise={handleAddExercise}
        chosenPreset={chosenPreset}
        isEdit={isEdit}
      />
    </>
  );
}

export default AddExerciseModal;
