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
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 1, weight: 185, reps: 5 },
              { id: 2, weight: 185, reps: 5 },
              { id: 3, weight: 185, reps: 5 },
              { id: 4, weight: 185, reps: 5 },
              { id: 5, weight: 185, reps: 5 },
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
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 6, weight: 135, reps: 5 },
              { id: 7, weight: 135, reps: 5 },
              { id: 8, weight: 135, reps: 5 },
              { id: 9, weight: 135, reps: 5 },
              { id: 10, weight: 135, reps: 5 },
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
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 11, weight: 125, reps: 5 },
              { id: 12, weight: 125, reps: 5 },
              { id: 13, weight: 125, reps: 5 },
              { id: 14, weight: 125, reps: 5 },
              { id: 15, weight: 125, reps: 5 },
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
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 16, weight: 185, reps: 5 },
              { id: 17, weight: 185, reps: 5 },
              { id: 18, weight: 185, reps: 5 },
              { id: 19, weight: 185, reps: 5 },
              { id: 20, weight: 185, reps: 5 },
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
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [
              { id: 21, weight: 95, reps: 5 },
              { id: 22, weight: 95, reps: 5 },
              { id: 23, weight: 95, reps: 5 },
              { id: 24, weight: 95, reps: 5 },
              { id: 25, weight: 95, reps: 5 },
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
                adaptive: true,
                inputBar: { type: "NumberIncrementBar", step: 1 },
              },
            ],
            sets: [{ id: 26, weight: 195, reps: 5 }],
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
              { id: 27, reps: 15 },
              { id: 28, reps: 15 },
              { id: 29, reps: 15 },
              { id: 30, reps: 15 },
              { id: 31, reps: 15 },
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
              { id: 32, weight: 125, reps: 5 },
              { id: 33, weight: 125, reps: 5 },
              { id: 34, weight: 125, reps: 5 },
              { id: 35, weight: 125, reps: 5 },
              { id: 36, weight: 125, reps: 5 },
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
              { id: 37, reps: 8 },
              { id: 38, reps: 6 },
              { id: 39, reps: 3 },
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
            sets: [{ id: 40, weight: 195, reps: 5 }],
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
              { id: 41, weight: 185, reps: 5 },
              { id: 42, weight: 185, reps: 5 },
              { id: 43, weight: 185, reps: 5 },
              { id: 44, weight: 185, reps: 5 },
              { id: 45, weight: 185, reps: 5 },
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
              { id: 46, weight: 215, reps: 5 },
              { id: 47, weight: 215, reps: 5 },
              { id: 48, weight: 215, reps: 5 },
              { id: 49, weight: 215, reps: 5 },
              { id: 50, weight: 215, reps: 5 },
            ],
          },
        ],
      },
    ],
  },
];
