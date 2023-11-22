// should be a way to iterate over all set properties to make this more general
function setValues(exerciseId, set) {
  return {
    [`exercise-${exerciseId}-weight-${set.id}`]: set.weight,
    [`exercise-${exerciseId}-reps-${set.id}`]: set.reps,
  };
}

function exerciseValues(exerciseId, setsArray) {
  let results = {};
  for (let i in setsArray) {
    results = { ...results, ...setValues(exerciseId, setsArray[i]) };
  }
  return results;
}

function workoutValues(exercisesArray) {
  let results = {};
  for (let i in exercisesArray) {
    results = {
      ...results,
      ...exerciseValues(exercisesArray[i].id, exercisesArray[i].sets),
    };
  }
  return results;
}

export function getDefaultValues(workout) {
  const defaultWorkoutValues = workoutValues(workout.exercises);

  console.log("workout results", defaultWorkoutValues);

  return defaultWorkoutValues;
}
