import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Theme } from "../../constants/themes";
import { useTheme } from "../../contexts/ThemeContext";

export default function HealthConnect() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleEnableHealthConnect = () => {
    // TODO: Enable Health Connect integration
    router.navigate("/get-started/email-preferences");
  };

  const handleNotNow = () => {
    router.navigate("/get-started/email-preferences");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="heart-pulse"
            size={80}
            color={theme.primary.main}
          />
        </View>

        <Text style={styles.title}>Connect Your Health Data</Text>
        <Text style={styles.subtitle}>
          Sync your fitness data automatically to track your progress and get
          personalized insights
        </Text>

        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color={theme.primary.main}
            />
            <Text style={styles.benefitText}>Automatic activity tracking</Text>
          </View>
          <View style={styles.benefitItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color={theme.primary.main}
            />
            <Text style={styles.benefitText}>Personalized recommendations</Text>
          </View>
          <View style={styles.benefitItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color={theme.primary.main}
            />
            <Text style={styles.benefitText}>Better progress insights</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.enableButton}
          onPress={handleEnableHealthConnect}
          activeOpacity={0.8}
        >
          <Text style={styles.enableButtonText}>Enable Health Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.notNowButton}
          onPress={handleNotNow}
          activeOpacity={0.7}
        >
          <Text style={styles.notNowButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.dark,
      paddingHorizontal: 32,
      paddingBottom: 20,
    },
    content: {
      flex: 1,
      alignItems: "center",
    },
    iconContainer: {
      marginBottom: 32,
      marginTop: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.foreground.white,
      textAlign: "center",
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: theme.foreground.gray,
      textAlign: "center",
      lineHeight: 24,
      marginBottom: 40,
    },
    benefitsContainer: {
      width: "100%",
      gap: 20,
    },
    benefitItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    benefitText: {
      fontSize: 16,
      color: theme.foreground.white,
      flex: 1,
    },
    buttonsContainer: {
      gap: 12,
    },
    enableButton: {
      backgroundColor: theme.primary.main,
      paddingVertical: 18,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    enableButtonText: {
      color: theme.background.dark,
      fontSize: 18,
      fontWeight: "bold",
    },
    notNowButton: {
      paddingVertical: 18,
      alignItems: "center",
      justifyContent: "center",
    },
    notNowButtonText: {
      color: theme.foreground.white,
      fontSize: 16,
      fontWeight: "600",
    },
  });
