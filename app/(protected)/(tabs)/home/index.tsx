import { deposite, me } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  Eye,
  EyeOff,
  Minus,
  Moon,
  Plus,
  Settings,
  Sun,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { formatAmountInput } from "./formatAmount";

const Index = () => {
  const [amount, setAmount] = useState(""); //this useState is used in mutation
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    throwOnError: true,
  });
  const queryClient = useQueryClient();
  const { mutate: depositeMutate } = useMutation({
    mutationKey: ["deposite"],
    mutationFn: () => deposite(Number(amount.replace(/,/g, ""))),
    onSuccess: (response) => {
      console.log("Deposite successful", response);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const { mutate: withdrawMutate } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: (amount: number) => deposite(Number(amount)),
    onSuccess: (response) => {
      console.log("Withdraw successful", response);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err) => {
      console.log("Withdraw error:", err);
    },
  });

  const handleWithdraw = () => {
    const numericAmount = Number(amount.replace(/,/g, ""));
    withdrawMutate(-numericAmount);
  };

  const handleDeposit = () => {
    const numericAmount = Number(amount.replace(/,/g, ""));

    // if (!numericAmount || numericAmount <= 0) {
    //   alert("Please enter a positive number.");
    //   return;
    // }

    depositeMutate();
  };

  const formatBalance = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KWD",
    }).format(value);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [toggleAnimation] = useState(new Animated.Value(0));

  // if (isLoading) return <Text>Loading...</Text>;
  // if (error) return <Text>Something went wrong </Text>;

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    Animated.timing(toggleAnimation, {
      toValue: isDarkMode ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleTranslateX = toggleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  const [showBalance, setShowBalance] = useState(true);

  return (
    <SafeAreaView
      // style={{
      //   justifyContent: "space-evenly",
      //   flexDirection: "column",
      //   backgroundColor: "grey",
      //   flex: 1,
      // }}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View
        // style={{
        //   alignItems: "center",
        //   justifyContent: "center",
        //   alignSelf: "center",
        //   borderWidth: 2,
        //   height: 200,
        //   width: "85%",
        //   borderRadius: 10,
        // }}
        style={styles.header}
      >
        <View style={styles.headerLeft}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
              }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.welcomeSection}>
            <Text style={[styles.welcomeText, { color: theme.textSecondary }]}>
              Welcome,
            </Text>
            <Text style={[styles.usernameText, { color: theme.textPrimary }]}>
              {data.username}
            </Text>
          </View>
          <View style={styles.headerRight}>
            {/* Dark Mode Toggle */}
            <TouchableOpacity
              style={[
                styles.darkModeToggle,
                { backgroundColor: theme.cardBackground },
              ]}
              onPress={toggleDarkMode}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.toggleTrack,
                  { backgroundColor: isDarkMode ? "#3b82f6" : "#e2e8f0" },
                ]}
              >
                <Animated.View
                  style={[
                    styles.toggleThumb,
                    {
                      transform: [{ translateX: toggleTranslateX }],
                      backgroundColor: "#ffffff",
                    },
                  ]}
                >
                  {isDarkMode ? (
                    <Moon size={12} color="#3b82f6" strokeWidth={2} />
                  ) : (
                    <Sun size={12} color="#f59e0b" strokeWidth={2} />
                  )}
                </Animated.View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.headerButton,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Bell size={22} color={theme.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.headerButton,
                { backgroundColor: theme.cardBackground },
              ]}
            >
              <Settings size={22} color={theme.textSecondary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <Text>Welcome {data.username}</Text>
        <Text>Your Available Balance:</Text> */}

        {/* <Text style={{ fontWeight: "bold", color: "#1591EA" }}>
          {Number(data.balance).toLocaleString("en-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}{" "}
          KWD
        </Text> */}
      </View>
      {/* Enhanced Balance Card with Theme Support */}
      <View style={styles.balanceCardContainer}>
        <View style={styles.balanceCard}>
          <View
            style={[
              styles.balanceGradient,
              { backgroundColor: theme.balanceCardBackground },
            ]}
          >
            <View style={styles.balanceHeader}>
              <View>
                <Text
                  style={[
                    styles.balanceLabel,
                    { color: theme.balanceCardSecondary },
                  ]}
                >
                  Total Balance
                </Text>
                <Text
                  style={[
                    styles.accountNumber,
                    { color: theme.balanceCardTertiary },
                  ]}
                >
                  •••• 1234
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowBalance(!showBalance)}
                style={styles.eyeButton}
              >
                {showBalance ? (
                  <Eye
                    size={20}
                    color={theme.balanceCardPrimary}
                    strokeWidth={2}
                  />
                ) : (
                  <EyeOff
                    size={20}
                    color={theme.balanceCardPrimary}
                    strokeWidth={2}
                  />
                )}
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.balanceAmount,
                { color: theme.balanceCardPrimary },
              ]}
            >
              {showBalance ? formatBalance(data.balance) : "•••••••"}
            </Text>

            <View style={styles.balanceFooter}>
              <View style={styles.balanceChange}></View>
            </View>
          </View>
        </View>
      </View>

      {/* <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          borderWidth: 2,
          height: 200,
          width: "85%",
          borderRadius: 10,
          marginTop: 100,
        }}
      >
        <Text>Amount to Deposit and Withdraw:</Text>
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={(text) => setAmount(formatAmountInput(text))}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "#000",
            padding: 10,
            margin: 10,
            borderRadius: 10,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Button
            title="Deposite"
            onPress={() => {
              handleDeposit();
            }}
          />
          <Button
            title="Withdraw"
            onPress={() => {
              handleWithdraw();
            }}
          />
        </View>
      </View> */}

      {/* Enhanced Quick Actions with Theme Support */}
      <View style={styles.quickActionsSection}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Quick Action
        </Text>

        <View
          style={[
            styles.amountInputCard,
            { backgroundColor: theme.cardBackground },
          ]}
        >
          <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
            Enter Amount
          </Text>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: theme.inputBorder,
                backgroundColor: theme.inputBackground,
              },
            ]}
          >
            <Text
              style={[styles.currencySymbol, { color: theme.textSecondary }]}
            >
              KWD
            </Text>
            <TextInput
              style={[styles.amountInput, { color: theme.textPrimary }]}
              value={amount}
              onChangeText={(text) => setAmount(formatAmountInput(text))}
              placeholder="0.000"
              placeholderTextColor={theme.textTertiary}
              keyboardType="numeric"
              returnKeyType="done"
            />
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmountButtons}>
            {["1,000", "5,000", "10,000"].map((quickAmount) => (
              <TouchableOpacity
                key={quickAmount}
                style={[
                  styles.quickAmountButton,
                  { backgroundColor: theme.quickButtonBackground },
                ]}
                onPress={() => setAmount(quickAmount.toString())}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    { color: theme.textSecondary },
                  ]}
                >
                  {quickAmount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.depositButton]}
            onPress={handleDeposit}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonIconContainer}>
                <Plus size={20} color="#ffffff" strokeWidth={2.5} />
              </View>
              <View>
                <Text style={styles.buttonText}>Deposit</Text>
                <Text style={styles.buttonSubtext}>Add money</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.withdrawButton]}
            onPress={handleWithdraw}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <View style={styles.buttonIconContainer}>
                <Minus size={20} color="#ffffff" strokeWidth={2.5} />
              </View>
              <View>
                <Text style={styles.buttonText}>Withdraw</Text>
                <Text style={styles.buttonSubtext}>Send money</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const lightTheme = {
  background: "#f8fafc",
  cardBackground: "#ffffff",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  textTertiary: "#94a3b8",
  inputBorder: "#e2e8f0",
  inputBackground: "#f8fafc",
  quickButtonBackground: "#f1f5f9",
  successBackground: "#dcfce7",
  errorBackground: "#fee2e2",
  dividerColor: "#e2e8f0",
  balanceCardBackground: "#1e293b",
  balanceCardPrimary: "#ffffff",
  balanceCardSecondary: "#94a3b8",
  balanceCardTertiary: "#64748b",
};

const darkTheme = {
  background: "#0f172a",
  cardBackground: "#1e293b",
  textPrimary: "#f8fafc",
  textSecondary: "#cbd5e1",
  textTertiary: "#94a3b8",
  inputBorder: "#334155",
  inputBackground: "#0f172a",
  quickButtonBackground: "#334155",
  successBackground: "#064e3b",
  errorBackground: "#7f1d1d",
  dividerColor: "#334155",
  balanceCardBackground: "#3730a3",
  balanceCardPrimary: "#ffffff",
  balanceCardSecondary: "#c7d2fe",
  balanceCardTertiary: "#a5b4fc",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  darkModeToggle: {
    width: 56,
    height: 32,
    borderRadius: 16,
    padding: 2,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  toggleTrack: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    position: "relative",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: "absolute",
    top: 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 16,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  welcomeSection: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  usernameText: {
    fontSize: 22,
    fontWeight: "700",
  },
  balanceCardContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  balanceCard: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  balanceGradient: {
    padding: 28,
    position: "relative",
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  accountNumber: {
    fontSize: 12,
    fontWeight: "500",
  },
  eyeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: "800",
    marginBottom: 24,
    letterSpacing: -1,
  },
  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceChange: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  quickActionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
  },

  amountInputCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 16,
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "700",
    paddingLeft: 20,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  quickAmountButtons: {
    flexDirection: "row",
    gap: 12,
  },
  quickAmountButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  depositButton: {
    backgroundColor: "#10b981",
  },
  withdrawButton: {
    backgroundColor: "#ef4444",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "700",
    marginBottom: 2,
  },
  buttonSubtext: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
});
