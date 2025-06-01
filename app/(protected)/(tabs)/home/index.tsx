import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const handleProfileButton = () => router.push("../(tabs)/home/Profile");
const handleTransactionsButton = () =>
  router.push("../(tabs)/home/Transactions");
const handleUsersButton = () => router.push("../(tabs)/home/Users");

const index = () => {
  return (
    <View>
      <View style={{ flexDirection: "row", marginRight: 5 }}>
        <ScrollView>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={handleTransactionsButton}
          >
            <Text>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={handleUsersButton}
          >
            <Text>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={handleProfileButton}
          >
            <Text>Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
