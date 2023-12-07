export const initialProgramData = [
  {
    name: "Stronglifts 5x5",
    id: 1,
    workouts: [
      {
        name: "A day",
        id: 1,
        order: 0,
        next: true,
        exercises: [
          {
            name: "Barbell Squats",
            id: 1,
            exerciseIndex: 1,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 5 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: false,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 1, metrics: { weight: 185, reps: 5 } },
              { id: 2, metrics: { weight: 185, reps: 5 } },
              { id: 3, metrics: { weight: 185, reps: 5 } },
              { id: 4, metrics: { weight: 185, reps: 5 } },
              { id: 5, metrics: { weight: 185, reps: 5 } },
            ],
          },
          {
            name: "Barbell Row",
            id: 2,
            exerciseIndex: 2,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 5 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: false,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 6, metrics: { weight: 135, reps: 5 } },
              { id: 7, metrics: { weight: 135, reps: 5 } },
              { id: 8, metrics: { weight: 135, reps: 5 } },
              { id: 9, metrics: { weight: 135, reps: 5 } },
              { id: 10, metrics: { weight: 135, reps: 5 } },
            ],
          },
          {
            name: "Bench Press",
            id: 3,
            exerciseIndex: 3,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 5 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: false,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 11, metrics: { weight: 125, reps: 5 } },
              { id: 12, metrics: { weight: 125, reps: 5 } },
              { id: 13, metrics: { weight: 125, reps: 5 } },
              { id: 14, metrics: { weight: 125, reps: 5 } },
              { id: 15, metrics: { weight: 125, reps: 5 } },
            ],
          },
        ],
      },
      {
        name: "B day",
        id: 2,
        order: 1,
        next: false,
        exercises: [
          {
            name: "Barbell Squats",
            id: 4,
            exerciseIndex: 1,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 5 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: false,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 16, metrics: { weight: 185, reps: 5 } },
              { id: 17, metrics: { weight: 185, reps: 5 } },
              { id: 18, metrics: { weight: 185, reps: 5 } },
              { id: 19, metrics: { weight: 185, reps: 5 } },
              { id: 20, metrics: { weight: 185, reps: 5 } },
            ],
          },
          {
            name: "Overhead Press",
            id: 5,
            exerciseIndex: 4,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 5 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: false,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 21, metrics: { weight: 95, reps: 5 } },
              { id: 22, metrics: { weight: 95, reps: 5 } },
              { id: 23, metrics: { weight: 95, reps: 5 } },
              { id: 24, metrics: { weight: 95, reps: 5 } },
              { id: 25, metrics: { weight: 95, reps: 5 } },
            ],
          },
          {
            name: "Deadlift",
            id: 6,
            exerciseIndex: 5,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 5 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: false,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [{ id: 26, metrics: { weight: 195, reps: 5 } }],
          },
        ],
      },
    ],
  },
  {
    name: "Sample training program",
    id: 2,
    workouts: [
      {
        name: "Push day",
        id: 3,
        order: 0,
        next: true,
        exercises: [
          {
            name: "Pushups",
            id: 7,
            exerciseIndex: 6,
            restTimer: 180,
            metrics: [
              {
                name: "reps",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 27, metrics: { reps: 15 } },
              { id: 28, metrics: { reps: 15 } },
              { id: 29, metrics: { reps: 15 } },
              { id: 30, metrics: { reps: 15 } },
              { id: 31, metrics: { reps: 15 } },
            ],
          },
          {
            name: "Bench Press",
            id: 8,
            exerciseIndex: 3,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 5 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 32, metrics: { weight: 125, reps: 5 } },
              { id: 33, metrics: { weight: 125, reps: 5 } },
              { id: 34, metrics: { weight: 125, reps: 5 } },
              { id: 35, metrics: { weight: 125, reps: 5 } },
              { id: 36, metrics: { weight: 125, reps: 5 } },
            ],
          },
        ],
      },
      {
        name: "Pull day",
        id: 4,
        order: 1,
        next: false,
        exercises: [
          {
            name: "Pullups",
            id: 9,
            exerciseIndex: 7,
            restTimer: 180,
            metrics: [
              {
                name: "reps",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 37, metrics: { reps: 8 } },
              { id: 38, metrics: { reps: 6 } },
              { id: 39, metrics: { reps: 3 } },
            ],
          },
          {
            name: "Deadlift",
            id: 10,
            exerciseIndex: 5,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 10 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [{ id: 40, metrics: { weight: 195, reps: 5 } }],
          },
        ],
      },
      {
        name: "Legs",
        id: 5,
        order: 2,
        next: false,
        exercises: [
          {
            name: "Barbell Squats",
            id: 11,
            exerciseIndex: 1,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 5 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 41, metrics: { weight: 185, reps: 5 } },
              { id: 42, metrics: { weight: 185, reps: 5 } },
              { id: 43, metrics: { weight: 185, reps: 5 } },
              { id: 44, metrics: { weight: 185, reps: 5 } },
              { id: 45, metrics: { weight: 185, reps: 5 } },
            ],
          },
          {
            name: "Leg Press",
            id: 12,
            exerciseIndex: 8,
            restTimer: 180,
            metrics: [
              {
                name: "weight",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 10 },
              },
              {
                name: "reps",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 46, metrics: { weight: 215, reps: 5 } },
              { id: 47, metrics: { weight: 215, reps: 5 } },
              { id: 48, metrics: { weight: 215, reps: 5 } },
              { id: 49, metrics: { weight: 215, reps: 5 } },
              { id: 50, metrics: { weight: 215, reps: 5 } },
            ],
          },
        ],
      },
      {
        name: "Swimming Day",
        id: 6,
        order: 3,
        next: false,
        exercises: [
          {
            name: "Swimming Laps",
            id: 13,
            exerciseIndex: 9,
            restTimer: 300,
            metrics: [
              {
                name: "laps",
                type: "number",
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 2 },
              },
            ],
            sets: [
              { id: 46, metrics: { laps: 12 } },
              { id: 47, metrics: { laps: 12 } },
              { id: 48, metrics: { laps: 12 } },
            ],
          },
        ],
      },
    ],
  },
];
