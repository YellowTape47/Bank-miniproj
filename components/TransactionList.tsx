import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TransactionListProps = {
  amountAction: number;
  type: string;
  from: number;
  to: string;
};

const TransactionList = ({
  amountAction,
  type,
  to,
  from,
}: TransactionListProps) => {
  const amountSymbol = () => {
    if (type.toUpperCase() === "WITHDRAW") return "- ";
    else if (type.toUpperCase() === "DEPOSIT") return "+ ";
  };

  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          marginTop: 20,
          width: "90%",
          justifyContent: "space-between",
          alignSelf: "center",
          padding: 20,
          borderRadius: 10,
          flexDirection: "row",
        }}
      >
        <Text>{amountSymbol() + Math.abs(amountAction)?.toLocaleString()}</Text>
        <Text>{from}</Text>
        <Text>{type.toUpperCase()}</Text>
        {/* <Text>{to}</Text> */}
      </View>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
