import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const tabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="users" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default tabLayout;

const styles = StyleSheet.create({});
