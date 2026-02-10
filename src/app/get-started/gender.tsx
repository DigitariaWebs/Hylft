import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";

export default function GenderSelection() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleContinue = () => {
    if (!selectedGender) return;
    // TODO: Save gender preference
    router.push("/get-started/health-connect");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>What's your birth gender?</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.foreground.white,
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.foreground.gray,
    marginBottom: 50,
  },
  optionsContainer: {
    gap: 16,
  },
  genderButton: {
    paddingVertical: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.foreground.gray,
    backgroundColor: colors.background.darker,
    alignItems: "center",
  },
  genderButtonSelected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.background.accent,
  },
  genderText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.foreground.gray,
  },
  genderTextSelected: {
    color: colors.primary.main,
  },
  continueButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: colors.background.dark,
    fontSize: 18,
    fontWeight: "bold",
  },
});
