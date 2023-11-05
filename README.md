# 5x5 Tracker

This app serves as a fitness tracker for the 5x5 Workout Program. It tracks your progress and has a rest timer when you're between your sets. You can customize and create new workouts with different exercises. Finally you can view historical data and visualize your progress.

## 5x5 Workout Program

The 5x5 program is fairly simple. It consists of 5 different compound exercises: Squat, Bench Press, Barbell Row, Overhead Press and Deadlift. These 5 exercises are split across two different workout routines:

- Workout A: Squat, Bench Press, Barbell Row
- Workout B: Squat, Overhead Press, Deadlift

You do 5 sets of 5 reps for each exercise (hence the 5x5 name) except for Deadlifts, where you only do a single set of 5 reps.

The goal is to do three workouts per week, alternating between A days and B days with at least a single rest day between workouts. You progressively increase the weight you lift over time to gain strength. A tracking app helps you monitor your progress.

## Project Planning

1. Gather **requirements & features**
2. Divide app into **pages**
3. Divide app into **feature categories**
4. Decide on what **libraries** to use (tech stack)

## Project requirements

- Track sets, reps, weights, times & notes for 5x5 workout
- Access stored information to see progress
- Visualize data with charts/graphs
- Rest timer between sets
  - audio tone when ending
  - add more time if needed
- Begin & End workout
- One-touch operation to flow from set to set within workout
- User can login or use offline
- User can create new workouts, update existing workouts and delete workouts
- User can also create new exercises that they 'own'. And can edit/delete owned exercises.
- Save default values for sets, weight and reps for each exercise in a workout. Default values can be overridden during workout, but if not then they are used by default.
- Set kg/lbs units
- Set increment/decrement quantity for weight input
- Dark mode/light mode

## App Pages

### Select Workout

- Select which workout you want to do
- Edit existing workout routines
- Add new workouts
- Calendar view for past workouts

### Edit Workout

- Delete workout
- Add / Remove exercises
- Set default number of sets for each exercise

### Do Workout

- Start workout / go back
- End workout
- Add more sets / exercises on top of default workout values
- Click exercise to begin next set
- Specify weight & reps for set
- Press rest timer to complete set
- Auto begin next set
- Skip to another exercise
- Edit previous sets

### History

- Calendar view:
  - All past dates you worked out
  - Past dates for each exercise or workout
- Table view:
  - Raw data for each exercise or workout
  - Stats
    - Average / Max / 1RM / Total weight / Total Reps for each exercise
- Graph view:
  - Week, month, year views
  - Past 7 days, past 30 days, past 365 days views
  - Number of workouts
  - Raw data & stats (Average / Max / 1RM / Total weight / Total reps) for each exercise

### Menu

- Units toggle
- Light / Dark mode toggle
- Link to History
- Link to Select / Do workout

## Feature Categories

- Authentication / Login
- Settings
- Define Exercises & Workouts
- Do Workout
- Stats / Visualization

## Tech Decisions

- React Router for Routing
- React Bootstrap for Styling
- React Query for State Management
- Context for UI State Management
- Recharts for visualizations
- Supabase for backend
- React Icons for graphics

## Workflow

- If active workout then Select Workout and Edit Workout pages redirect to ongoing Do Workout page. History page is viewable.

### Main Workflow

This is the most common workflow when using the app to track your workout and everything is already set up correctly:

1. Select Workout page
   1. Choose existing workout
   2. Redirect to Do Workout page
2. Do Workout page
   1. Begin workout
   2. Next set auto opens
   3. Do set
   4. Log set / start rest timer, repeat steps 2-4 until all sets completed.
   5. Workout auto finishes upon logging final set.
   6. Redirect to History page
3. History page
   1. Display stats for last completed workout

Altogether it's:

- 1 touch to select workout
- 1 touch to begin workout
- 1 touch to log each set. This auto moves onto next set or completes workout on final set

### Setup New Workout Workflow

This workflow is for when you want to setup a new workout

1. Select Workout page
   1. Add Workout
   2. Redirect to Edit Workout page
2. Edit Workout page
   1. Name Workout
   2. Add Exercise
   3. Opens modal to select desired exercise
   4. Input default weight for set (optional)
   5. Input default number of reps for set (optional)
   6. Copy for default number of sets (optional)
   7. Can edit sets to change default weight/rep values
   8. Repeat 1-6 for additional exercises
   9. Save workout
   10. Redirect to Select Workout page

### Copy / Edit Workout Workflow

These workflows are for copying & editing existing workouts

#### Copy

1. Select Workout page
   1. Open context menu for target workout
   2. Select `copy` from modal window
   3. Copy of workout with name 'Copy of Workout_name' is auto added to Workout list

#### Edit

1. Select Workout page
   1. Open context menu for target workout
   2. Select `edit` from modal window
   3. Redirect to Edit Workout page
2. Edit Workout page
   1. Rename workout (optional)
   2. Edit exercises, reps, sets as when creating new workout.
   3. Save workout
   4. Redirect to Select Workout page

## Data Modelling & Flow

## Niggles

- Indeterminant weight: A set where you're rapidly changing weight between each rep. Or band exercises where resistance is based on band thickness / amount of stretch. Or for bodyweight exercises.
- Indeterminant reps: Exact reps maybe not important, but rather duration for timed sets.
- Adding extra rest time after timer is completed. Maybe keep current timer open while completed set collapses and new set opens. So if you move onto next set, the previous timer is still available if you scroll up.
- Navigating to a page while a workout is active. Shouldn't be able to select a new workout or edit a workout if you're currently in the middle of doing an active workout. Redirect to Do Workout page in this case. May need an `active-workout` flag in state to trigger redirects.
- How to handle guest (local storage) accounts with signed-in (database storage) accounts? Some way to reconcile the two where if you were previously using a guest account, when you sign into an account, the local storage data is uploaded to the database.
- Offline usage. Likewise if you're already signed in, but are offline, new data should be recorded to local storage and uploaded/reconciled with database when reconnected. If using multiple devices, then more recent database data should be added to local storage to keep in sync?
- Option to auto start next set. Good for timed exercises.
