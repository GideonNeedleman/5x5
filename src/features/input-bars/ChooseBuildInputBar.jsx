import BuildNumberIncrementBar from "./BuildNumberIncrementBar";

function ChooseBuildInputBar({
  inputBar,
  metric,
  register,
  setValue,
  getValues,
  resetField,
  defaultValue,
  units,
  placeholder,
  fieldname,
  index,
  watch,
}) {
  switch (inputBar) {
    case "NumberIncrementBar":
      return (
        <BuildNumberIncrementBar
          index={index}
          register={register}
          setValue={setValue}
          getValues={getValues}
          resetField={resetField}
          defaultValue={defaultValue}
          watch={watch}
        />
      );
    case "test":
      return <p>Test successful</p>;
    default:
      return <p>{/* No matching input bar */}</p>;
  }
}

export default ChooseBuildInputBar;

/* metric,
  register,
  setValue,
  getValues,
  resetField, // used to fix deleted field state bug
  isFinished = false,
  isUnlocked = true,
  defaultValue,
  fieldName = metric.name, */
