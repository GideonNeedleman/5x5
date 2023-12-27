export const initialExerciseData = [
  {
    name: "Barbell Back Squat",
    id: 1,
    description:
      "The squat is the king of all exercises, working over 256 muscles in one movement! From bodybuilders to powerlifters to competitive athletes, the squat is a staple compound exercise and should be in every workout plan. For powerlifters, it is known as one of the “big three” lifts which includes the squat, deadlift, and bench press. ",
    restTimer: 90,
    metrics: [
      {
        name: "weight",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 5,
        default: 185,
        units: "lbs",
        better: "bigger",
      },
      {
        name: "reps",
        adaptive: false,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 5,
        units: "",
        better: "bigger",
      },
    ],
  },
  {
    name: "Barbell Bent Over Row",
    id: 2,
    description:
      "Sometimes referred to as the barbell row, the bent over row is a staple movement in most muscle building workouts. Those looking to build muscle utilize the bent over row to target their back, bicep and core muscle. Those in powerlifting and strength circles perform bent over rows to increase their strength on the big 3 movements. The bent over row is typically used to build and strengthen the muscles of the upper back (latissimus dorsi, rhomboids, and trapezius). However, it requires assistance from muscles of the low back, core, and arms to perform a bent over row correctly.",
    restTimer: 90,
    metrics: [
      {
        name: "weight",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 5,
        default: 135,
        units: "lbs",
        better: "bigger",
      },
      {
        name: "reps",
        adaptive: false,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 5,
        units: "",
        better: "bigger",
      },
    ],
  },
  {
    name: "Barbell Bench Press",
    id: 3,
    description:
      "The barbell bench press is a classic exercise popular among all weight lifting circles. From bodybuilders to powerlifters, the bench press is a staple chest exercise in nearly every workout program. For powerlifters, it is known as one of the “big three” lifts which includes the squat, deadlift, and bench press. For athletes, 1 rep max on bench press is a good indicator for on field/court performance. And for bodybuilders, the bench press is a compound exercise that targets many of the muscles in your upper body.",
    restTimer: 90,
    metrics: [
      {
        name: "weight",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 5,
        default: 135,
        units: "lbs",
        better: "bigger",
      },
      {
        name: "reps",
        adaptive: false,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 5,
        units: "",
        better: "bigger",
      },
    ],
  },
  {
    name: "Barbell Overhead Press",
    id: 4,
    description:
      "The military press is a complete shoulder building exercise perfect for building shoulder muscle. The military press is an exercise with many names and is often referred to as the shoulder press, overhead press, and strict press. The military press is used primarily to build the deltoid muscle. It also indirectly targets the other muscles of the shoulder, your triceps, and your core. Since the military press is completed standing up, it involves a lot of core strength to help stabilize the spine while pressing weight overhead.",
    restTimer: 90,
    metrics: [
      {
        name: "weight",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 5,
        default: 105,
        units: "lbs",
        better: "bigger",
      },
      {
        name: "reps",
        adaptive: false,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 5,
        units: "",
        better: "bigger",
      },
    ],
  },
  {
    name: "Barbell Deadlift",
    id: 5,
    description:
      "The deadlift is an extremely popular exercise and a true test of total body strength. It is popular across numerous weight lifting circle including bodybuilders, powerlifts, and Crossfit athletes. The deadlift focuses on lifting dead weight off the ground to hip level without using momentum to assist the weight on its path up. It is known as one of the “big three” exercises for powerlifters which includes squats, bench press, and the deadlift. Bodybuilders use the deadlift to promote muscle growth in their entire posterior chain (muscles on the back of the body).",
    restTimer: 90,
    metrics: [
      {
        name: "weight",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 5,
        default: 190,
        units: "lbs",
        better: "bigger",
      },
      {
        name: "reps",
        adaptive: false,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 5,
        units: "",
        better: "bigger",
      },
    ],
  },
  {
    name: "Push Up",
    id: 6,
    description:
      "The push up is an exercise used to build the muscles of the chest. The shoulders and triceps will be indirectly involved as well. The push up is an old school movement that nearly everyone has performed at one point or another in their lifetime. The exercise is extremely beneficial in not only building the chest but also promoting healthy shoulder stability.",
    restTimer: 60,
    metrics: [
      {
        name: "reps",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 15,
        units: "",
        better: "bigger",
      },
    ],
  },
  {
    name: "Pullups",
    id: 7,
    description:
      "The pull up is a classic exercise and one used to target the upper back muscles such as the latissimus dorsi. Vertical pulling movements, such as the pull up, are foundational movements that should be included in your workout routines. So, once you’ve found a variation you like and feels comfortable to you, master it as it will benefit you from a strength and aesthetic standpoint.",
    restTimer: 90,
    metrics: [
      {
        name: "reps",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 7,
        units: "",
        better: "bigger",
      },
    ],
  },
  {
    name: "Leg Press",
    id: 8,
    description:
      "The leg press is a variation of the squat and an exercise used to target the muscles of the leg. One can utilize the leg press to target both the quads and the hamstring muscle, depending on which portion of the foot they push through. The leg press is commonly thought of as a machine variation of the barbell back squat. The mechanics are fairly similar, however, the leg press does not completely mimic the movement pattern of the squat. Nor does it work all of the muscle groups that the squat does.",
    restTimer: 90,
    metrics: [
      {
        name: "weight",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 200,
        units: "lbs",
        better: "bigger",
      },
      {
        name: "reps",
        adaptive: false,
        inputBar: "NumberIncrementBar",
        step: 1,
        default: 5,
        units: "",
        better: "bigger",
      },
    ],
  },
  {
    name: "Swimming Laps",
    id: 9,
    description:
      "Swim a lap across a pool using the swimming stroke of your choice.",
    restTimer: 300,
    metrics: [
      {
        name: "laps",
        adaptive: true,
        inputBar: "NumberIncrementBar",
        step: 2,
        default: 8,
        units: "",
        better: "bigger",
      },
    ],
  },
];
