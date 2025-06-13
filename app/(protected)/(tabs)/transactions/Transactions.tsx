import { listOfTransactions } from "@/api/auth";
import TransactionList from "@/components/TransactionList";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

const Transactions = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: listOfTransactions,
  });

  //refetch upon screen focus
  useFocusEffect(
    useCallback(() => {
      refetch(); // ensures fresh data on screen focus
    }, [])
  );

  const sortedData = data
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  //   const filteredAndSortedData = data
  // ?.filter((item) => item.type === 'withdraw')
  // .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (isLoading) return <Text>Loading ...</Text>;
  if (error) return <Text>Something went wrong </Text>;

  // console.log("fetching data --> ", data);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "center",
          marginTop: 70,
        }}
      >
        <TextInput
          placeholder="Search"
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            width: "80%",
          }}
        />
      </View>
      <View>
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TransactionList
              amountAction={item.amount}
              type={item.type}
              from={item.createdAt}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Transactions;
