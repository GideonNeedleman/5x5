import { Button, ButtonGroup } from "react-bootstrap";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import vibrator from "vibrator";

function IncrementButtonBar({
  variant = "secondary",
  decrement,
  increment,
  disableMinus = false,
  disablePlus = false,
  children,
}) {
  return (
    <ButtonGroup className="w-100 mt-3" size="lg">
      <Button
        variant={variant}
        onClick={() => {
          decrement();
          vibrator(1);
        }}
        disabled={disableMinus}
      >
        <BsDashLg />
      </Button>

      <Button
        className="w-100"
        variant={variant}
        onClick={() => {
          increment();
          vibrator(1);
        }}
        size="lg"
        disabled={disablePlus}
      >
        {children}
      </Button>

      <Button
        variant={variant}
        onClick={() => {
          increment();
          vibrator(1);
        }}
        disabled={disablePlus}
      >
        <BsPlusLg />
      </Button>
    </ButtonGroup>
  );
}

export default IncrementButtonBar;
