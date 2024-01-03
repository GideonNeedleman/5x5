import { Button } from "react-bootstrap";
import { useGlobalContext } from "../../context/GlobalContext";
import vibrator from "vibrator";

function ExercisePresets({ onHide, setChosenPreset, setShowPresets }) {
  const { exercisePresets } = useGlobalContext();

  return (
    <div className="mx-2">
      <h1 className="text-center display-4">Select Preset</h1>
      <div className="d-flex flex-column gap-2">
        <Button
          onClick={() => {
            vibrator(1);
            setShowPresets(false);
          }}
          variant="secondary"
          className="text-capitalize"
        >
          No Preset
        </Button>
        {exercisePresets.map((preset, index) => (
          <Button
            onClick={() => {
              vibrator(1);
              setChosenPreset(preset.metrics);
              setShowPresets(false);
            }}
            variant="outline-secondary"
            key={index}
            className="text-capitalize"
          >
            {preset.name}
          </Button>
        ))}
      </div>
      <div className="d-flex justify-content-end">
        <Button
          className="my-3"
          onClick={() => {
            onHide();
            vibrator(1);
          }}
          variant="secondary"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ExercisePresets;
