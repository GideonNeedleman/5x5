import { Card, Form } from "react-bootstrap";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect, useState } from "react";

function AddWorkoutToProgram({
  register,
  index,
  // setValue,
  // getValues,
  // resetField,
  watch,
  defaultWorkout = null,
}) {
  const { workoutData } = useGlobalContext();
  const chosenWorkoutId = watch(`id-${index + 1}`);
  const chosenWorkout = workoutData.find((el) => el.id == chosenWorkoutId);

  // force exercise list to render after defaultValues set
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    setRerender(true);
  }, []);

  return (
    <Card bg="primary">
      <Card.Body className="d-flex flex-column gap-3">
        <Card.Title className="text-white">Workout #{index + 1}</Card.Title>
        <Form.Select
          {...register(`id-${index + 1}`, {
            valueAsNumber: true,
          })}
          className="fs-3 text-center"
          defaultValue={defaultWorkout?.id}
        >
          <option value={0}>Choose workout...</option>
          {workoutData.map((workout) => (
            <option value={workout.id} key={workout.id}>
              {workout.name}
            </option>
          ))}
        </Form.Select>

        {/* Display exercises list */}
        {rerender && (
          <div className="bg-light rounded">
            <ul className="list-group">
              {chosenWorkout?.exercises.map((exercise) => (
                <li className="list-group-item" key={exercise.id}>
                  {exercise.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default AddWorkoutToProgram;
