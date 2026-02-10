import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../constants/colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BACKGROUND_IMAGES = [
  require("../../../assets/images/AuthPage/DeadLiftIGuess.jpg"),
  require("../../../assets/images/AuthPage/HoldingTwoWeights.jpg"),
  require("../../../assets/images/AuthPage/OneKneeOnTheGround.jpg"),
  require("../../../assets/images/AuthPage/PullUp.jpg"),
];

export default function AuthLanding() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change image
        setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);

        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const handleEmailSignUp = () => {
    router.navigate("/auth/signup");
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google Sign Up
    console.log("Google Sign Up");
  };

  const handleSignIn = () => {
    router.navigate("/auth/signin");
  };

  return (
    <View style={styles.container}>
      {/* Background Image with fade animation */}
      <Animated.Image
        source={BACKGROUND_IMAGES[currentImageIndex]}
        style={[styles.backgroundImage, { opacity: fadeAnim }]}
        resizeMode="cover"
      />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/images/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <Text style={styles.title}>Sign up to get started</Text>

          {/* Google Sign Up Button */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignUp}
            activeOpacity={0.8}
          >
            <AntDesign
              name="google"
              size={20}
              color={colors.background.dark}
              style={styles.buttonIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Email Sign Up Button */}
          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailSignUp}
            activeOpacity={0.8}
          >
            <MaterialIcons
              name="email"
              size={20}
              color={colors.background.dark}
              style={styles.buttonIcon}
            />
            <Text style={styles.emailButtonText}>Continue with Email</Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
              <Text style={styles.signInLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  backgroundImage: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  overlay: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: 140,
    height: 50,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.foreground.white,
    textAlign: "center",
    marginBottom: 32,
  },
  googleButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    flexDirection: "row",
  },
  googleButtonText: {
    color: colors.background.dark,
    fontSize: 16,
    fontWeight: "600",
  },
  emailButton: {
    backgroundColor: colors.foreground.white,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    flexDirection: "row",
  },
  emailButtonText: {
    color: colors.background.dark,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonIcon: {
    marginRight: 12,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    color: colors.foreground.white,
    fontSize: 14,
  },
  signInLink: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: "600",
  },
});
