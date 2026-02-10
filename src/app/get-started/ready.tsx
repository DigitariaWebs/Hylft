import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

export default function Ready() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.navigate("/home");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="check-circle"
            size={120}
            color={colors.primary.main}
          />
        </View>

        <Text style={styles.title}>You're Ready!</Text>
        <Text style={styles.subtitle}>
          Let's start your fitness journey together
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
    paddingHorizontal: 32,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.foreground.white,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.foreground.gray,
    textAlign: "center",
    lineHeight: 28,
  },
});
