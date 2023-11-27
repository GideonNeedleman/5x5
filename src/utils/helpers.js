/* These functions destructured entire dummy data to load defaultValues into workout when treating all workout fields as a single giant form. This is a messy way of doing things that pulls apart values from individual sets, then requires you to restitch the submitted data back into individual set objects. I've since refactored the code to treat each individual set as a separate form submission that builds up a tempWorkoutData object. The tempWorkoutData can then be sent to persistent storage upon finishing workout.

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
} */

export function getSetDefaultValues(set) {
  let properties = Object.keys(set);
  let results = {};
  for (let i in properties) {
    if (properties[i] === "id") continue;
    if (set[properties[i]] === null) continue;
    results = {
      ...results,
      [`${properties[i]}`]: set[properties[i]],
    };
  }
  return results;
}
