import { deposite, me } from "@/api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

// const handleProfileButton = () => router.push("../(tabs)/home/Profile");
// const handleTransactionsButton = () =>
//   router.push("../(tabs)/home/Transactions");
// const handleUsersButton = () => router.push("../(tabs)/home/Users");

const Index = () => {
  const [amount, setAmount] = useState(""); //this useState is used in mutation
  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    throwOnError: true,
  });

  const { mutate: depositeMutate } = useMutation({
    mutationKey: ["deposite"],
    mutationFn: () => deposite(Number(amount)),
    onSuccess: (response) => {
      console.log("Deposite done", response);
    },
    onError: (err) => {
      console.log("Error:", err);
    },
  });

  const { mutate: withdrawMutate } = useMutation({
    mutationKey: ["withdraw"],
    mutationFn: () => deposite(Number(amount)),
    onSuccess: (response) => {
      console.log("Withdraw done", response);
    },
    onError: (err) => {
      console.log("Error:", err);
    },
  });
  const handleWithdraw = () => {
    withdrawMutate();
  };

  const handleDeposite = () => {
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
        <Text> {data.balance} KWD</Text>
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
        <Text>Your Deposite:</Text>
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          style={{
            borderWidth: 1,
            borderColor: "#000",
            padding: 10,
            margin: 10,
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
