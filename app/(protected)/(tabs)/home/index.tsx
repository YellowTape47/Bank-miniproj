import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const handleProfileButton = () => router.push("../(tabs)/home/Profile");
const handleTransactionsButton = () =>
  router.push("../(tabs)/home/Transactions");
const handleUsersButton = () => router.push("../(tabs)/home/Users");

const index = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 10,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* <TouchableOpacity style={styles.tabs}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabs}
          onPress={handleTransactionsButton}
        >
          <Text>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabs} onPress={handleUsersButton}>
          <Text>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabs} onPress={handleProfileButton}>
          <Text>Profile</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  tabs: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    padding: 3,
    borderRadius: 5,
  },
});
