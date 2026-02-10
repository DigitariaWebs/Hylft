import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function Profile() {
  const { theme, themeType, setTheme } = useTheme();
  const styles = createStyles(theme);

  const toggleTheme = () => {
    const newTheme = themeType === "male" ? "female" : "male";
    setTheme(newTheme);
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={28} color={theme.foreground.white} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=33" }}
            style={styles.avatar}
          />
          <Text style={styles.username}>@your_username</Text>
          <Text style={styles.bio}>Fitness Enthusiast | Building Strength</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>89</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={toggleTheme}>
              <Ionicons
                name={themeType === "male" ? "man" : "woman"}
                size={20}
                color={theme.foreground.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trophy" size={24} color={theme.primary.main} />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>
          <View style={styles.achievementsGrid}>
            <View style={styles.achievementCard}>
              <Ionicons name="flame" size={32} color="#FF6B35" />
              <Text style={styles.achievementValue}>30</Text>
              <Text style={styles.achievementLabel}>Day Streak</Text>
            </View>
            <View style={styles.achievementCard}>
              <Ionicons name="barbell" size={32} color={theme.primary.main} />
              <Text style={styles.achievementValue}>145</Text>
              <Text style={styles.achievementLabel}>Workouts</Text>
            </View>
            <View style={styles.achievementCard}>
              <Ionicons name="trophy" size={32} color="#FFD700" />
              <Text style={styles.achievementValue}>12</Text>
              <Text style={styles.achievementLabel}>PRs</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function createStyles(theme: any) {
  return StyleSheet.create({
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
    settingsButton: {
      padding: 4,
    },
    content: {
      flex: 1,
    },
    profileSection: {
      alignItems: "center",
      paddingVertical: 32,
      paddingHorizontal: 16,
      borderBottomWidth: 8,
      borderBottomColor: theme.background.darker,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
      borderWidth: 3,
      borderColor: theme.primary.main,
    },
    username: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.foreground.white,
      marginBottom: 8,
    },
    bio: {
      fontSize: 14,
      color: theme.foreground.gray,
      textAlign: "center",
      marginBottom: 24,
    },
    statsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
      paddingHorizontal: 32,
      width: "100%",
    },
    statItem: {
      flex: 1,
      alignItems: "center",
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: theme.background.darker,
    },
    statValue: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.foreground.white,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: theme.foreground.gray,
    },
    actionButtons: {
      flexDirection: "row",
      gap: 12,
      width: "100%",
    },
    editButton: {
      flex: 1,
      backgroundColor: theme.primary.main,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    editButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.background.dark,
    },
    shareButton: {
      backgroundColor: theme.background.darker,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    section: {
      padding: 16,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 8,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.foreground.white,
    },
    achievementsGrid: {
      flexDirection: "row",
      gap: 12,
    },
    achievementCard: {
      flex: 1,
      backgroundColor: theme.background.darker,
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
    },
    achievementValue: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.foreground.white,
      marginTop: 8,
      marginBottom: 4,
    },
    achievementLabel: {
      fontSize: 12,
      color: theme.foreground.gray,
      textAlign: "center",
    },
  });
}
