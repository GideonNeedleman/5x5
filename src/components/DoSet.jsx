import { Accordion, Button } from "react-bootstrap";
import { useGlobalContext } from "../context/GlobalContext";
import SetBody from "./SetBody";
// import { useFinishWorkout } from "../hooks/useFinishWorkout";

function DoSet({
  set,
  numSets,
  index,
  activeKey,
  handleFinishSet,
  isLastExercise,
}) {
  // const handleFinishWorkout = useFinishWorkout();
  const { dispatch } = useGlobalContext();

  const isLastSet = index + 1 === numSets && isLastExercise;

  function handleClick() {
    if (isLastSet) {
      // handleFinishWorkout();
      handleFinishSet();
      return;
    }
    if (index + 1 === numSets) dispatch({ type: "next-exercise" });
    else handleFinishSet();
  }

  return (
    <Accordion.Item eventKey={`${index - 1 + activeKey}`}>
      <Accordion.Header>
        <span className="d-flex justify-content-between w-100 px-1">
          <span className="fw-bold">Set {index + 1}</span>
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <SetBody weight={set.weight} reps={set.reps} />
        {/* <p>Weight: {set.weight}lbs</p>
        <p>Reps: {set.reps}lbs</p> */}
        <Button className="w-100 my-2" onClick={handleClick}>
          {isLastSet ? "Finish Set" : "Rest Timer"}
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default DoSet;
