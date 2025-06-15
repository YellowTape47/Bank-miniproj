import { login } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Shield,
  User,
} from "lucide-react-native";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const { mutate, isSuccess, isError } = useMutation({
    mutationKey: ["LoginAsAUser"],
    mutationFn: () => login(username, password),
    onSuccess: () => {
      setIsAuthenticated(true);
      router.replace("/home");
      console.log("logged in successfully as: ", username);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  if (isSuccess) return <Text>Successfully Login...</Text>;
  if (isError) return <Text>Error</Text>;

  const handleLogin = () => {
    // console.log("handling Login --> ", handleLogin);

    mutate();
    // console.log("mutate --> ", mutate);
  };

  // setIsLoading(true);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <Shield size={32} color="#ffffff" strokeWidth={2} />
              </View>
            </View>
            <Text style={styles.appName}>CODED Bank</Text>
            <Text style={styles.tagline}>Your trusted financial partner</Text>
          </View>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign in to access your account and manage your finances securely
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            {/* Username Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Username</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <User size={20} color="#64748b" strokeWidth={2} />
                </View>
                <TextInput
                  style={styles.textInput}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter your username"
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
                  style={styles.textInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
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

            {/* Forgot Password
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity> */}

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <View style={styles.loginButtonContent}>
                <Text style={styles.loginButtonText}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Text>
                {!isLoading && (
                  <ArrowRight size={20} color="#ffffff" strokeWidth={2} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            placeholder="Enter your username"
            placeholderTextColor="#94a3b8"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.title}>Password</Text>
          <TextInput
            placeholder="password"
            style={styles.input}
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.btn}>
            <Text style={styles.title}>Login</Text>
          </TouchableOpacity>
          <View>
            <Text>Do not have account?</Text>
            <Button title="Register" onPress={() => router.push("/Register")} />
          </View> */}

          {/* Register Section */}
          <View style={styles.registerSection}>
            <Text style={styles.registerPrompt}>Do not have an account?</Text>
            <Link href="/Register" asChild>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Create Account</Text>
              </TouchableOpacity>
            </Link>
          </View>
          {/* Security Notice */}
          <View style={styles.securityNotice}>
            <Shield size={16} color="#10b981" strokeWidth={2} />
            <Text style={styles.securityText}>
              Your data is protected with bank-level security
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

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
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3730a3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3730a3",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "500",
  },
  welcomeSection: {
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 12,
    letterSpacing: -1,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#cbd5e1",
    lineHeight: 24,
    fontWeight: "400",
  },
  formContainer: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "600",
  },
  loginButton: {
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
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  biometricSection: {
    marginBottom: 32,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#334155",
  },
  dividerText: {
    fontSize: 14,
    color: "#64748b",
    marginHorizontal: 16,
    fontWeight: "500",
  },
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    borderRadius: 16,
    height: 56,
    borderWidth: 2,
    borderColor: "#334155",
    gap: 12,
  },
  biometricIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  biometricText: {
    fontSize: 16,
    color: "#cbd5e1",
    fontWeight: "600",
  },
  registerSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    gap: 8,
  },
  registerPrompt: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "500",
  },
  registerButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  registerButtonText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "700",
  },
  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    gap: 8,
  },
  securityText: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "600",
  },
  btn: {
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 10,
    backgroundColor: "#d1d1d1",
  },
  title: {
    textAlign: "center",
    fontSize: 34,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 10,
  },
});

{
  /* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  keyboardView: {
    flex: 1,
  },
  welcomeSection: {
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 12,
    letterSpacing: -1,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 34,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 10,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 10,
    backgroundColor: "#d1d1d1",
  },
}); */
}
