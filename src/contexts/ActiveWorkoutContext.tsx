import React, { createContext, ReactNode, useContext, useState } from "react";

interface ActiveWorkout {
  id: string;
  duration: number;
  volume: number;
  sets: number;
}

interface ActiveWorkoutContextType {
  activeWorkout: ActiveWorkout | null;
  startWorkout: (workout: ActiveWorkout) => void;
  updateWorkout: (updates: Partial<ActiveWorkout>) => void;
  discardWorkout: () => void;
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
    setActiveWorkout(workout);
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

  return (
    <ActiveWorkoutContext.Provider
      value={{
        activeWorkout,
        startWorkout,
        updateWorkout,
        discardWorkout,
        isExpanded,
        setIsExpanded,
      }}
    >
      {children}
    </ActiveWorkoutContext.Provider>
  );
};
