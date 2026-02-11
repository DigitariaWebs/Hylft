import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Theme } from "../../constants/themes";
import { useTheme } from "../../contexts/ThemeContext";

type UnitOption = {
  label: string;
  value: string;
};

export default function UnitsSelection() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [selectedWeight, setSelectedWeight] = useState<string>("kg");
  const [selectedDistance, setSelectedDistance] = useState<string>("km");
  const [selectedHeight, setSelectedHeight] = useState<string>("cm");

  const weightOptions: UnitOption[] = [
    { label: "Kilograms", value: "kg" },
    { label: "Pounds", value: "lbs" },
  ];

  const distanceOptions: UnitOption[] = [
    { label: "Kilometers", value: "km" },
    { label: "Miles", value: "mi" },
  ];

  const heightOptions: UnitOption[] = [
    { label: "Centimeters", value: "cm" },
    { label: "Inches", value: "in" },
  ];

  const handleContinue = () => {
    // TODO: Save unit preferences
    router.navigate("/get-started/gender");
  };

  const renderOptionGroup = (
    title: string,
    options: UnitOption[],
    selected: string,
    onSelect: (value: string) => void,
  ) => (
    <View style={styles.optionGroup}>
      <Text style={styles.optionTitle}>{title}</Text>
      <View style={styles.optionsRow}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              selected === option.value && styles.optionButtonSelected,
            ]}
            onPress={() => onSelect(option.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.optionText,
                selected === option.value && styles.optionTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Your Units</Text>
        <Text style={styles.subtitle}>
          Choose your preferred measurement units
        </Text>

        <View style={styles.optionsContainer}>
          {renderOptionGroup(
            "Weight",
            weightOptions,
            selectedWeight,
            setSelectedWeight,
          )}
          {renderOptionGroup(
            "Distance",
            distanceOptions,
            selectedDistance,
            setSelectedDistance,
          )}
          {renderOptionGroup(
            "Height",
            heightOptions,
            selectedHeight,
            setSelectedHeight,
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

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
      marginBottom: 20,
    },
    optionsContainer: {
      gap: 32,
    },
    optionGroup: {
      gap: 12,
    },
    optionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.foreground.white,
      marginBottom: 4,
    },
    optionsRow: {
      flexDirection: "row",
      gap: 12,
    },
    optionButton: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.foreground.gray,
      backgroundColor: theme.background.darker,
      alignItems: "center",
    },
    optionButtonSelected: {
      borderColor: theme.primary.main,
      backgroundColor: theme.background.accent,
    },
    optionText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.foreground.gray,
    },
    optionTextSelected: {
      color: theme.primary.main,
    },
    continueButton: {
      backgroundColor: theme.primary.main,
      paddingVertical: 18,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    continueButtonText: {
      color: theme.background.dark,
      fontSize: 18,
      fontWeight: "bold",
    },
  });
}
