import NumberIncrementBar from "./NumberIncrementBar";

function ChooseInputBar({ inputBar, register }) {
  switch (inputBar) {
    case "NumberIncrementBar":
      return <NumberIncrementBar register={register} />;
  }
}

export default ChooseInputBar;
