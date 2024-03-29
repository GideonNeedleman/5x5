import NumberIncrementBar from "../input-bars/NumberIncrementBar";

function SetBody({
  set,
  exercise,
  register,
  setValue,
  getValues,
  resetField,
  isFinished,
  isUnlocked,
}) {
  // in future can generalize to other metrics by looping over set metrics and displaying input fields for each one. Can also have different types of metrics (integer values, times, distances, text dropdown, etc) to properly format the inputs. Use metric.inputBar to choose correct inputBar type. Maybe use switch statement when mapping over the metrics array.
  return (
    <>
      {exercise.metrics.map((metric, index) => (
        <NumberIncrementBar
          metric={metric}
          register={register}
          setValue={setValue}
          getValues={getValues}
          resetField={resetField}
          isFinished={isFinished}
          isUnlocked={isUnlocked}
          defaultValue={set.metrics[metric.name]}
          // fieldName={metric.name}
          key={index}
        />
      ))}
    </>
  );
}

export default SetBody;
