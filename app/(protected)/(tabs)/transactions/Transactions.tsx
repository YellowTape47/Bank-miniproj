import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

const Transactions = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "center",
          marginTop: 15,
        }}
      >
        <TextInput
          placeholder="Search"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            width: 325,
          }}
        />
        <Button title="Search" />
      </View>
      <View></View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
