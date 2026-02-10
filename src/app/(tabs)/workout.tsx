import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Theme } from "../../constants/themes";
import { useTheme } from "../../contexts/ThemeContext";

export default function Workout() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
        <View style={styles.emptyState}>
          <Ionicons name="barbell" size={80} color={theme.foreground.gray} />
          <Text style={styles.emptyTitle}>No Workouts Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start tracking your workouts to see them here
          </Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
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
      paddingVertical: 16,
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
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 32,
      paddingTop: 120,
    },
    emptyTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.foreground.white,
      marginTop: 24,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: theme.foreground.gray,
      textAlign: "center",
      marginBottom: 32,
    },
    startButton: {
      backgroundColor: theme.primary.main,
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 12,
    },
    startButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.background.dark,
    },
  });
