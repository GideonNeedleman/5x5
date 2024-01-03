export const initialExercisePresets = [
  {
    id: 1,
    name: "weight lifting",
    metrics: [
      {
        adaptive: true,
        better: "bigger",
        default: null,
        inputBar: "NumberInputBar",
        name: "weight",
        step: 5,
        units: "lbs",
      },
      {
        adaptive: false,
        better: "bigger",
        default: null,
        inputBar: "NumberInputBar",
        name: "reps",
        step: 1,
        units: null,
      },
    ],
  },
];
