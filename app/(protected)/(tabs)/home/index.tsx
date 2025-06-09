import { deposite, me } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { formatAmountInput } from "./formatAmount";

const Index = () => {
  const [amount, setAmount] = useState(""); //this useState is used in mutation
  const { data, isLoading, error } = useQuery({
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

  const handleDeposite = () => {
    const numericAmount = Number(amount.replace(/,/g, ""));

    // if (!numericAmount || numericAmount <= 0) {
    //   alert("Please enter a positive number.");
    //   return;
    // }

    depositeMutate();
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Something went wrong </Text>;

  return (
    <View style={{ justifyContent: "space-between" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          borderWidth: 2,
          height: 200,
          width: "85%",
          borderRadius: 10,
        }}
      >
        <Text>Your name: {data.username}</Text>
        <Text>Your Available Balance:</Text>
        <Text>
          {Number(data.balance).toLocaleString("en-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}{" "}
          KWD
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          borderWidth: 2,
          height: 200,
          width: "85%",
          borderRadius: 10,
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
        <Button
          title="Deposite"
          onPress={() => {
            handleDeposite();
          }}
        />
        <Button
          title="Withdraw"
          onPress={() => {
            handleWithdraw();
          }}
        />
      </View>
    </View>
  );
};

export default Index;
