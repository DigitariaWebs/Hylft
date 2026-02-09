import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FitLife! 💪</Text>
      <Text style={styles.subtitle}>Your fitness journey starts here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.dark,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.foreground.white,
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: colors.foreground.gray,
    textAlign: "center",
  },
});
