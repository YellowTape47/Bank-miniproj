import { Tabs } from "expo-router";
import React from "react";

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
