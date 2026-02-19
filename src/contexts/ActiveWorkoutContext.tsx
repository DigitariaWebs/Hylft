import React, { createContext, ReactNode, useContext, useState } from "react";

/** Exercise entry within a workout session */
export interface WorkoutExerciseEntry {
  id: string; // unique id for this entry in the workout
  exerciseId: number; // wger exercise id
  name: string;
  muscles: Array<{ id: number; name: string; name_en: string }>;
  equipment: Array<{ id: number; name: string }>;
  reps?: number;
  weight?: number;
  notes?: string;
  addedAt: number; // timestamp
}

interface ActiveWorkout {
  id: string;
  duration: number;
  volume: number;
  sets: number;
  exercises: WorkoutExerciseEntry[];
}

interface ActiveWorkoutContextType {
  activeWorkout: ActiveWorkout | null;
  startWorkout: (workout: ActiveWorkout) => void;
  updateWorkout: (updates: Partial<ActiveWorkout>) => void;
  discardWorkout: () => void;
  addExerciseToWorkout: (exercise: any) => void; // from wgerApi
  removeExerciseFromWorkout: (exerciseEntryId: string) => void;
  updateExerciseEntry: (
    exerciseEntryId: string,
    updates: Partial<WorkoutExerciseEntry>,
  ) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const ActiveWorkoutContext = createContext<
  ActiveWorkoutContextType | undefined
>(undefined);

export const useActiveWorkout = () => {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error(
      "useActiveWorkout must be used within ActiveWorkoutProvider",
    );
  }
  return context;
};

interface ActiveWorkoutProviderProps {
  children: ReactNode;
}

export const ActiveWorkoutProvider: React.FC<ActiveWorkoutProviderProps> = ({
  children,
}) => {
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(
    null,
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const startWorkout = (workout: ActiveWorkout) => {
    const workoutWithExercises = {
      ...workout,
      exercises: workout.exercises || [],
    };
    setActiveWorkout(workoutWithExercises);
    setIsExpanded(true);
  };

  const updateWorkout = (updates: Partial<ActiveWorkout>) => {
    if (activeWorkout) {
      setActiveWorkout({ ...activeWorkout, ...updates });
    }
  };

  const discardWorkout = () => {
    setActiveWorkout(null);
    setIsExpanded(false);
  };

  const addExerciseToWorkout = (exercise: any) => {
    if (!activeWorkout) return;

    const entry: WorkoutExerciseEntry = {
      id: `${Date.now()}-${Math.random()}`, // unique entry id
      exerciseId: exercise.id,
      name: exercise.name,
      muscles: exercise.muscles || [],
      equipment: exercise.equipment || [],
      addedAt: Date.now(),
    };

    setActiveWorkout({
      ...activeWorkout,
      exercises: [...activeWorkout.exercises, entry],
      sets: activeWorkout.sets + 1, // increment set count
    });
  };

  const removeExerciseFromWorkout = (exerciseEntryId: string) => {
    if (!activeWorkout) return;
    setActiveWorkout({
      ...activeWorkout,
      exercises: activeWorkout.exercises.filter(
        (ex) => ex.id !== exerciseEntryId,
      ),
      sets: Math.max(0, activeWorkout.sets - 1),
    });
  };

  const updateExerciseEntry = (
    exerciseEntryId: string,
    updates: Partial<WorkoutExerciseEntry>,
  ) => {
    if (!activeWorkout) return;
    setActiveWorkout({
      ...activeWorkout,
      exercises: activeWorkout.exercises.map((ex) =>
        ex.id === exerciseEntryId ? { ...ex, ...updates } : ex,
      ),
    });
  };

  return (
    <ActiveWorkoutContext.Provider
      value={{
        activeWorkout,
        startWorkout,
        updateWorkout,
        discardWorkout,
        addExerciseToWorkout,
        removeExerciseFromWorkout,
        updateExerciseEntry,
        isExpanded,
        setIsExpanded,
      }}
    >
      {children}
    </ActiveWorkoutContext.Provider>
  );
};
