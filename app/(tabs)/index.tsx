import { View, Text, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import userRequests from "@/apis/userRequests";
import { useStore } from "@/context/store";
import { Ionicons } from "@expo/vector-icons";
import HeaderProfile from "@/components/home/HeaderProfile";
import SearchBar from "@/components/home/SearchBar";

const Home = () => {
  const sessionId = useStore((s) => s.sessionId);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["accountDetails"],
    queryFn: () => userRequests.getAccountDetails(sessionId!),
    enabled: !!sessionId, // Only run if we have a sessionId
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.log(error);
    return <Text>Error: {(error as Error).message}</Text>;
  }

  return (
    <View className="flex-1 bg-[#1F1D2B]">
      <HeaderProfile data={data} />
      <SearchBar />
    </View>
  );
};

export default Home;
