import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Theme } from "../../constants/themes";
import { useTheme } from "../../contexts/ThemeContext";

function createStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.dark,
      paddingHorizontal: 32,
      paddingBottom: 20,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.foreground.white,
      marginVertical: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.foreground.gray,
      marginBottom: 50,
    },
    optionsContainer: {
      gap: 16,
    },
    genderButton: {
      paddingVertical: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.foreground.gray,
      backgroundColor: theme.background.darker,
      alignItems: "center",
    },
    genderButtonSelected: {
      borderColor: theme.primary.main,
      backgroundColor: theme.background.accent,
    },
    genderText: {
      fontSize: 20,
      fontWeight: "600",
      color: theme.foreground.gray,
    },
    genderTextSelected: {
      color: theme.primary.main,
    },
    continueButton: {
      backgroundColor: theme.primary.main,
      paddingVertical: 18,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    continueButtonDisabled: {
      opacity: 0.5,
    },
    continueButtonText: {
      color: theme.background.dark,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
}

export default function GenderSelection() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleContinue = () => {
    if (!selectedGender) return;
    // Save gender preference and set theme
    setTheme(selectedGender as "male" | "female");
    router.push("/get-started/health-connect");
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What&apos;s your birth gender?</Text>
        <Text style={styles.subtitle}>
          This helps us provide personalized recommendations
        </Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === "male" && styles.genderButtonSelected,
            ]}
            onPress={() => setSelectedGender("male")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "male" && styles.genderTextSelected,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === "female" && styles.genderButtonSelected,
            ]}
            onPress={() => setSelectedGender("female")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "female" && styles.genderTextSelected,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedGender && styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={!selectedGender}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
