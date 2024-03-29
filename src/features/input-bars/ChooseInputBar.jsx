import NumberIncrementBar from "./NumberIncrementBar";

// use this component for displaying input bar in SetBody

function ChooseInputBar({
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
}) {
  switch (inputBar) {
    case "NumberIncrementBar":
      return (
        <NumberIncrementBar
          metric={metric}
          fieldName={fieldname}
          register={register}
          setValue={setValue}
          getValues={getValues}
          resetField={resetField}
          defaultValue={defaultValue}
          units={units}
          placeholder={placeholder}
        />
      );
    case "test":
      return <p>Test successful</p>;
    default:
      return <p>{/* No matching input bar */}</p>;
  }
}

export default ChooseInputBar;

/* metric,
  register,
  setValue,
  getValues,
  resetField, // used to fix deleted field state bug
  isFinished = false,
  isUnlocked = true,
  defaultValue,
  fieldName = metric.name, */
