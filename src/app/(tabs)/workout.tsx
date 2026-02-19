import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Theme } from "../../constants/themes";
import { useActiveWorkout } from "../../contexts/ActiveWorkoutContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
  getRoutinesByUserId,
  getWorkoutsByUserId,
  Routine,
  Workout as WorkoutData,
} from "../../data/mockData";

export default function Workout() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const { startWorkout } = useActiveWorkout();

  useEffect(() => {
    // Simulating fetching workouts for current user (userId "1")
    const userWorkouts = getWorkoutsByUserId("1");
    setWorkouts(userWorkouts);

    // Fetch user routines
    const userRoutines = getRoutinesByUserId("1");
    setRoutines(userRoutines);
  }, []);

  const handleStartEmptyWorkout = () => {
    startWorkout({
      id: `workout-${Date.now()}`,
      duration: 0,
      volume: 0,
      sets: 0,
      exercises: [],
    });
  };

  const handleWorkoutSettings = () => {
    console.log("Open settings");
    // TODO: Show workout settings
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workout</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={32} color={theme.primary.main} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleStartEmptyWorkout}
          >
            <View style={styles.actionIconContainer}>
              <Ionicons
                name="fitness-outline"
                size={28}
                color={theme.primary.main}
              />
            </View>
            <Text style={styles.actionButtonText}>Start Empty Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons
                name="create-outline"
                size={28}
                color={theme.primary.main}
              />
            </View>
            <Text style={styles.actionButtonText}>Create Routine</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Ionicons
                name="compass-outline"
                size={28}
                color={theme.primary.main}
              />
            </View>
            <Text style={styles.actionButtonText}>Explore Routines</Text>
          </TouchableOpacity>
        </View>

        {/* My Routines Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Routines</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {routines.length === 0 ? (
            <View style={styles.emptyRoutines}>
              <Ionicons
                name="barbell"
                size={60}
                color={theme.foreground.gray}
              />
              <Text style={styles.emptyRoutinesText}>
                No routines yet. Create one to get started!
              </Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.routinesScroll}
            >
              {routines.map((routine) => (
                <TouchableOpacity key={routine.id} style={styles.routineCard}>
                  <View style={styles.routineHeader}>
                    <Text style={styles.routineName}>{routine.name}</Text>
                    <View
                      style={[
                        styles.difficultyBadge,
                        styles[`difficulty_${routine.difficulty}`],
                      ]}
                    >
                      <Text style={styles.difficultyText}>
                        {routine.difficulty}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.routineDescription} numberOfLines={2}>
                    {routine.description}
                  </Text>

                  <View style={styles.routineStats}>
                    <View style={styles.routineStat}>
                      <Ionicons
                        name="time-outline"
                        size={14}
                        color={theme.foreground.gray}
                      />
                      <Text style={styles.routineStatText}>
                        {routine.estimatedDuration}m
                      </Text>
                    </View>
                    <View style={styles.routineStat}>
                      <Ionicons
                        name="barbell-outline"
                        size={14}
                        color={theme.foreground.gray}
                      />
                      <Text style={styles.routineStatText}>
                        {routine.exercises.length} exercises
                      </Text>
                    </View>
                  </View>

                  <View style={styles.musclesContainer}>
                    {routine.targetMuscles.slice(0, 3).map((muscle, index) => (
                      <View key={index} style={styles.muscleTag}>
                        <Text style={styles.muscleTagText}>{muscle}</Text>
                      </View>
                    ))}
                  </View>

                  {routine.timesCompleted > 0 && (
                    <Text style={styles.completedText}>
                      Completed {routine.timesCompleted}x
                    </Text>
                  )}

                  <TouchableOpacity style={styles.startRoutineButton}>
                    <Text style={styles.startRoutineButtonText}>
                      Start Routine
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={16}
                      color={theme.background.dark}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Recent Workouts Section */}
        {workouts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Workouts</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.workoutsList}>
              {workouts.map((workout) => (
                <View key={workout.id} style={styles.workoutCard}>
                  <View style={styles.workoutHeader}>
                    <View>
                      <Text style={styles.workoutName}>{workout.name}</Text>
                      <Text style={styles.workoutDate}>{workout.date}</Text>
                    </View>
                    <View style={styles.workoutMeta}>
                      <View style={styles.metaItem}>
                        <Ionicons
                          name="time"
                          size={16}
                          color={theme.primary.main}
                        />
                        <Text style={styles.metaText}>{workout.duration}m</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Ionicons
                          name="flame"
                          size={16}
                          color={theme.primary.main}
                        />
                        <Text style={styles.metaText}>
                          {workout.caloriesBurned}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.exercisesContainer}>
                    <Text style={styles.exercisesTitle}>
                      {workout.exercises.length} Exercises
                    </Text>
                    {workout.exercises.slice(0, 3).map((exercise) => (
                      <View key={exercise.id} style={styles.exerciseItem}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <View style={styles.exerciseDetails}>
                          {exercise.sets && (
                            <Text style={styles.exerciseDetail}>
                              {exercise.sets}x{exercise.reps}
                            </Text>
                          )}
                          {exercise.weight && (
                            <Text style={styles.exerciseDetail}>
                              {exercise.weight}
                            </Text>
                          )}
                        </View>
                      </View>
                    ))}
                    {workout.exercises.length > 3 && (
                      <Text style={styles.moreExercises}>
                        +{workout.exercises.length - 3} more exercises
                      </Text>
                    )}
                  </View>

                  {workout.notes && (
                    <View style={styles.notesContainer}>
                      <Text style={styles.notesText}>{workout.notes}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.dark,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.background.darker,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    addButton: {
      padding: 4,
    },
    content: {
      flex: 1,
    },
    // Quick Actions
    quickActions: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 20,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      backgroundColor: theme.background.darker,
      borderRadius: 12,
      padding: 16,
      alignItems: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: theme.background.darker,
    },
    actionIconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.background.dark,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 4,
    },
    actionButtonText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.foreground.white,
      textAlign: "center",
    },
    // Sections
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    seeAllText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.primary.main,
    },
    // Empty States
    emptyRoutines: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
      paddingHorizontal: 32,
    },
    emptyRoutinesText: {
      fontSize: 14,
      color: theme.foreground.gray,
      textAlign: "center",
      marginTop: 12,
    },
    // Routines
    routinesScroll: {
      paddingHorizontal: 16,
      gap: 12,
    },
    routineCard: {
      width: 280,
      backgroundColor: theme.background.darker,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.background.darker,
    },
    routineHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    routineName: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.foreground.white,
      flex: 1,
      marginRight: 8,
    },
    difficultyBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    difficulty_beginner: {
      backgroundColor: "#22c55e20",
    },
    difficulty_intermediate: {
      backgroundColor: "#f59e0b20",
    },
    difficulty_advanced: {
      backgroundColor: "#ef444420",
    },
    difficultyText: {
      fontSize: 10,
      fontWeight: "600",
      color: theme.foreground.white,
      textTransform: "uppercase",
    },
    routineDescription: {
      fontSize: 13,
      color: theme.foreground.gray,
      marginBottom: 12,
      lineHeight: 18,
    },
    routineStats: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 12,
    },
    routineStat: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    routineStatText: {
      fontSize: 12,
      color: theme.foreground.gray,
    },
    musclesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginBottom: 12,
    },
    muscleTag: {
      backgroundColor: theme.background.dark,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.primary.main + "30",
    },
    muscleTagText: {
      fontSize: 11,
      fontWeight: "600",
      color: theme.primary.main,
      textTransform: "capitalize",
    },
    completedText: {
      fontSize: 12,
      color: theme.foreground.gray,
      marginBottom: 12,
      fontStyle: "italic",
    },
    startRoutineButton: {
      backgroundColor: theme.primary.main,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    startRoutineButtonText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.background.dark,
    },
    // Workouts List
    workoutsList: {
      paddingHorizontal: 12,
    },
    workoutCard: {
      backgroundColor: theme.background.darker,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
      borderLeftColor: theme.primary.main,
    },
    workoutHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 16,
    },
    workoutName: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    workoutDate: {
      fontSize: 14,
      color: theme.foreground.gray,
      marginTop: 4,
    },
    workoutMeta: {
      flexDirection: "row",
      gap: 12,
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: theme.background.dark,
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 6,
    },
    metaText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.foreground.white,
    },
    exercisesContainer: {
      marginBottom: 12,
    },
    exercisesTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.primary.main,
      marginBottom: 8,
      textTransform: "uppercase",
    },
    exerciseItem: {
      marginBottom: 8,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.background.dark,
    },
    exerciseName: {
      fontSize: 15,
      fontWeight: "600",
      color: theme.foreground.white,
      marginBottom: 4,
    },
    exerciseDetails: {
      flexDirection: "row",
      gap: 12,
    },
    exerciseDetail: {
      fontSize: 13,
      color: theme.foreground.gray,
      backgroundColor: theme.background.dark,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    moreExercises: {
      fontSize: 13,
      color: theme.primary.main,
      fontWeight: "600",
      marginTop: 4,
    },
    notesContainer: {
      backgroundColor: theme.background.dark,
      padding: 10,
      borderRadius: 8,
      borderLeftWidth: 2,
      borderLeftColor: theme.primary.main,
    },
    notesText: {
      fontSize: 13,
      color: theme.foreground.gray,
      fontStyle: "italic",
    },
  });
