import BuildNumberIncrementBar from "./BuildNumberIncrementBar";

function ChooseBuildInputBar({
  inputBar,
  // metric,
  register,
  setValue,
  getValues,
  resetField,
  defaultValue,
  // units,
  // placeholder,
  // fieldname,
  index,
  watch,
  edit,
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
          edit={edit}
          inputBar={inputBar}
        />
      );
    case "test":
      return <p>Test successful</p>;
    default:
      return <p>{/* No matching input bar */}</p>;
  }
}

export default ChooseBuildInputBar;
