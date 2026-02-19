import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { forwardRef, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Theme } from "../../constants/themes";
import {
  useActiveWorkout,
  WorkoutExerciseEntry,
} from "../../contexts/ActiveWorkoutContext";
import { useTheme } from "../../contexts/ThemeContext";

interface ActiveWorkoutSheetProps {
  onSettings?: () => void;
  isExpanded?: boolean;
}

const ActiveWorkoutSheet = forwardRef<BottomSheet, ActiveWorkoutSheetProps>(
  ({ onSettings, isExpanded = false }, ref) => {
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const {
      activeWorkout,
      discardWorkout,
      setIsExpanded,
      removeExerciseFromWorkout,
    } = useActiveWorkout();
    const snapPoints = useMemo(() => ["100%"], []);

    // Format duration as mm:ss
    const formatDuration = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleDiscard = () => {
      discardWorkout();
      setIsExpanded(false);
    };

    const renderExerciseItem = ({ item }: { item: WorkoutExerciseEntry }) => {
      const muscles = item.muscles.map((m) => m.name_en || m.name).join(", ");

      return (
        <View style={styles.exerciseListItem}>
          <View style={styles.exerciseListItemContent}>
            <Text style={styles.exerciseListItemName}>{item.name}</Text>
            <Text style={styles.exerciseListItemMuscles}>{muscles}</Text>
            <View style={styles.repsWeightContainer}>
              {item.reps ? (
                <Text style={styles.repsWeightText}>{item.reps} reps</Text>
              ) : null}
              {item.weight ? (
                <Text style={styles.repsWeightText}>{item.weight} lbs</Text>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => removeExerciseFromWorkout(item.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      );
    };

    if (!activeWorkout) {
      return null;
    }

    return (
      <BottomSheet
        ref={ref}
        index={isExpanded ? 0 : -1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose
        onClose={() => {
          setIsExpanded(false);
        }}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Active Workout</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={onSettings}
              >
                <Ionicons
                  name="settings-outline"
                  size={24}
                  color={theme.foreground.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleDiscard}
              >
                <Ionicons name="trash-outline" size={24} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons
                name="time-outline"
                size={24}
                color={theme.primary.main}
              />
              <Text style={styles.statValue}>
                {formatDuration(activeWorkout.duration)}
              </Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons
                name="barbell-outline"
                size={24}
                color={theme.primary.main}
              />
              <Text style={styles.statValue}>{activeWorkout.volume} lbs</Text>
              <Text style={styles.statLabel}>Volume</Text>
            </View>

            <View style={styles.statCard}>
              <Ionicons
                name="repeat-outline"
                size={24}
                color={theme.primary.main}
              />
              <Text style={styles.statValue}>{activeWorkout.sets}</Text>
              <Text style={styles.statLabel}>Sets</Text>
            </View>
          </View>

          {/* Exercises List or Empty State */}
          {activeWorkout.exercises.length > 0 ? (
            <FlatList
              data={activeWorkout.exercises}
              keyExtractor={(item) => item.id}
              renderItem={renderExerciseItem}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    backgroundColor: theme.foreground.gray,
                    opacity: 0.2,
                  }}
                />
              )}
            />
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Ionicons
                  name="fitness-outline"
                  size={64}
                  color={theme.foreground.gray}
                />
              </View>
              <Text style={styles.emptyTitle}>Get Started</Text>
              <Text style={styles.emptySubtitle}>
                Add an exercise to start your workout
              </Text>
            </View>
          )}

          {/* Add Exercise Button */}
          <TouchableOpacity
            style={styles.addExerciseButton}
            onPress={() => router.navigate("exercise-picker" as any)}
          >
            <Ionicons
              name="add-circle"
              size={24}
              color={theme.background.dark}
            />
            <Text style={styles.addExerciseButtonText}>Add Exercise</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

ActiveWorkoutSheet.displayName = "ActiveWorkoutSheet";

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    bottomSheetBackground: {
      backgroundColor: theme.background.dark,
    },
    handleIndicator: {
      backgroundColor: theme.foreground.gray,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    headerButtons: {
      flexDirection: "row",
      gap: 12,
    },
    headerButton: {
      padding: 8,
    },
    statsGrid: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 32,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.background.darker,
      borderRadius: 16,
      padding: 16,
      alignItems: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: theme.background.darker,
    },
    statValue: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.foreground.gray,
      textTransform: "uppercase",
    },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 40,
    },
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.background.darker,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.foreground.white,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 15,
      color: theme.foreground.gray,
      textAlign: "center",
      paddingHorizontal: 32,
    },
    addExerciseButton: {
      backgroundColor: theme.primary.main,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      marginTop: "auto",
    },
    addExerciseButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.background.dark,
    },
    exerciseListItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      gap: 12,
    },
    exerciseListItemContent: {
      flex: 1,
      gap: 4,
    },
    exerciseListItemName: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    exerciseListItemMuscles: {
      fontSize: 13,
      color: theme.foreground.gray,
    },
    repsWeightContainer: {
      flexDirection: "row",
      gap: 12,
    },
    repsWeightText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.primary.main,
    },
  });

export default ActiveWorkoutSheet;
