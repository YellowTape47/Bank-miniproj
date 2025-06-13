import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";

const tabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="retweet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="users" />
    </Tabs>
  );
};

export default tabLayout;
