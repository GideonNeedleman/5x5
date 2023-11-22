function setValues(exerciseId, set) {
  let properties = Object.keys(set);
  let results = {};
  for (let i in properties) {
    if (properties[i] === "id") continue;
    if (set[properties[i]] === null) continue;
    results = {
      ...results,
      [`exercise-${exerciseId}-${properties[i]}-${set.id}`]: set[properties[i]],
    };
  }
  return results;
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

  return defaultWorkoutValues;
}
