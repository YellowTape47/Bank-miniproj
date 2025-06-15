import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Eye,
  EyeOff,
  Lock,
  Shield,
  User,
} from "lucide-react-native";
import React, { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string>("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { mutate, data } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(name, password, image),
    onSuccess: () => {
      setIsAuthenticated(true);
      console.log("Captured Token --> ", data);

      router.replace("/");
    },
    onError: (error) => {
      console.log("Unknown error:", error);
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      // quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleRegister = () => {
    mutate();
  };

  const goBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.scrollContent}>
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <ArrowLeft size={24} color="#ffffff" strokeWidth={2} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.logoContainer}>
                <View style={styles.logoBackground}>
                  <Shield size={28} color="#ffffff" strokeWidth={2} />
                </View>
              </View>
              <Text style={styles.appName}>Create Account</Text>
              <Text style={styles.tagline}>Join CODED Bank Today</Text>
            </View>
          </View>
          {/* Profile Image Upload */}
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Profile Picture</Text>
            <TouchableOpacity
              style={styles.imageUploadContainer}
              onPress={pickImage}
            >
              <View style={styles.imagePreviewContainer}>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={styles.profileImagePreview}
                  />
                )}
                <View style={styles.imagePlaceholder}>
                  <Camera size={32} color="#64748b" strokeWidth={2} />
                  <Text style={styles.imageUploadText}>Tap to add photo</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            {/* Username Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <User size={20} color="#64748b" strokeWidth={2} />
                </View>
                <TextInput
                  placeholder="Enter your username"
                  style={styles.textInput}
                  onChangeText={(text) => setName(text.toLowerCase())}
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Lock size={20} color="#64748b" strokeWidth={2} />
                </View>
                <TextInput
                  placeholder="Enter your password"
                  style={styles.textInput}
                  onChangeText={(text) => setPassword(text.toLowerCase())}
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#64748b" strokeWidth={2} />
                  ) : (
                    <Eye size={20} color="#64748b" strokeWidth={2} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {/* Terms and Conditions */}
            <View style={styles.termsSection}>
              <Text style={styles.termsText}>
                By creating an account, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>

          {/* <Button title="Register" onPress={handleRegister} /> */}
          <View>
            {/* Register Button */}
            <TouchableOpacity
              style={[
                styles.registerButton,
                isLoading && styles.registerButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <View style={styles.registerButtonContent}>
                <Text style={styles.registerButtonText}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Text>
                {!isLoading && (
                  <ArrowRight size={20} color="#ffffff" strokeWidth={2} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 22,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },
  headerContent: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3730a3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3730a3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "500",
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 16,
  },
  imageUploadContainer: {
    width: 120,
    height: 120,
    borderRadius: 50,
    overflow: "hidden",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1e293b",
    borderWidth: 2,
    borderColor: "#334155",
    borderStyle: "dashed",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  imageUploadText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
  imagePreviewContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  profileImagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#3730a3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#0f172a",
  },
  formContainer: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#334155",
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "500",
  },
  eyeButton: {
    padding: 4,
  },
  validationIcon: {
    marginLeft: 8,
  },
  validationText: {
    fontSize: 12,
    color: "#ef4444",
    fontWeight: "500",
    marginTop: 6,
  },
  validationSuccess: {
    color: "#10b981",
  },
  passwordStrength: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  strengthIndicator: {
    flexDirection: "row",
    gap: 4,
  },
  strengthBar: {
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#334155",
  },
  strengthBarActive: {
    backgroundColor: "#10b981",
  },
  strengthText: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
  termsSection: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: "#94a3b8",
    lineHeight: 18,
    textAlign: "center",
  },
  termsLink: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#3730a3",
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3730a3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  securityFeatures: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#334155",
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: "#cbd5e1",
    fontWeight: "500",
  },
});
