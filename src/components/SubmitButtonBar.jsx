import { Button } from "react-bootstrap";
import vibrator from "vibrator";
import { useNavigate } from "react-router-dom";

function SubmitButtonBar({ children, onHide, modal = false }) {
  const navigate = useNavigate();
  return (
    <div className="d-flex gap-3 my-3">
      <Button
        variant="warning"
        className="flex-grow-1 w-25 "
        onClick={
          modal
            ? () => {
                onHide();
                vibrator(-1);
              }
            : () => {
                navigate(-1);
                vibrator(1);
              }
        }
      >
        Cancel
      </Button>
      <Button
        className="flex-grow-1 w-100"
        onClick={() => vibrator(1)}
        type="submit"
      >
        {children}
      </Button>
    </div>
  );
}

export default SubmitButtonBar;
