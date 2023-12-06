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

/* I've stopped using react hook form useForm({defaultValues: xxx}) to set the default values. Instead I'm passing in the defaultValue prop directly to the input field when mapping over the inputBars. This is a much more natural way of doing it

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
} */

// potential BUG if value is not a number. Would need a way to check correct intended datatype
export function objectToArray(object) {
  let properties = Object.keys(object);
  let array = [];
  for (let i in properties) {
    array = [...array, { name: properties[i], value: object[properties[i]] }];
  }
  return array;
}

export function displayDuration(seconds) {
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const Minutes = Math.floor(minutes);
  const Hours = Math.floor(hours);

  if (Hours > 0) {
    return `${Hours}h${Math.floor(minutes - Hours * 60)}m${Math.floor(
      seconds - Minutes * 60
    )}s`;
  }

  if (Minutes > 0)
    return `${Math.floor(minutes - Hours * 60)}m${Math.floor(
      seconds - Minutes * 60
    )}s`;

  return `${Math.floor(seconds)}s`;
}

export function filterObject(object, filterList) {
  // filterObject({reps: 5, weight: 100, height: 20}, [reps, weight]) returns {reps: 5, weight: 100}

  // return an empty object if the filterList is not an array
  if (!Array.isArray(filterList)) return {};

  const newObject = {};

  for (const property of filterList) {
    if (property in object) {
      newObject[property] = object[property];
    }
  }

  return newObject;
}
