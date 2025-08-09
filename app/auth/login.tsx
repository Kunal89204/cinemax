import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import authRequests from "@/apis/authRequests";
import { router } from "expo-router";
import { useStore } from "@/context/store";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setSessionId = useStore((s) => s.setSessionId);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["login"],
    queryFn: () => authRequests.getToken(),
  });

  const getSessionMutation = useMutation({
    mutationFn: async () =>
      await authRequests.getSession(data.request_token),
    onSuccess: async (data) => {
      await setSessionId(data.session_id); // Updates both AsyncStorage + store
      router.replace("/(tabs)"); // Go to home
    },
  });

  const loginMutation = useMutation({
    mutationFn: async () =>
      await authRequests.login(username, password, data.request_token),
    onSuccess: () => {
      getSessionMutation.mutate();
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {(error as Error).message}</Text>;
  return (
    <View className="flex-1 " style={{ backgroundColor: "#1F1D2B" }}>
      <Text className="text-white text-center py-4 text-2xl">Login</Text>

      <View
        className="mx-auto"
        style={{
          maxWidth: 400,
          paddingHorizontal: 20,
          marginTop: 70,
        }}
      >
        <Text className="text-white text-center text-3xl">Hi,</Text>
        <Text className="text-[#EBEBEF] text-center text-lg max-w-[250px] mx-auto ">
          Welcome back, please enter you details
        </Text>
      </View>

      <View
        className="mx-auto"
        style={{
          maxWidth: 400,
          paddingHorizontal: 20,
          marginTop: 100,
        }}
      >
        <Text className="text-white text-lg p-3">Username</Text>
        <TextInput
          placeholder="Enter your username"
          className="border  border-gray-300 rounded-md p-2 text-white"
          style={{
            color: "white",
            borderColor: "#252836",
            borderRadius: 9999999,
            width: 350,
            padding: 14,
          }}
          placeholderTextColor="#92929D"
          value={username}
          onChangeText={setUsername}
        />
        <Text className="text-white p-3 mt-6">Password</Text>
        <TextInput
          placeholder="Enter your password"
          className="border  border-gray-300 rounded-md p-2 text-white"
          style={{
            color: "white",
            borderColor: "#252836",
            borderRadius: 9999999,
            width: 350,
            padding: 14,
          }}
          placeholderTextColor="#92929D"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View
        className="mx-auto"
        style={{
          maxWidth: 400,
          paddingHorizontal: 20,
          marginTop: 80,
        }}
      >
        <TouchableOpacity
          className="w-full"
          style={{
            width: 350,
          }}
          onPress={() => loginMutation.mutate()}
        >
          <Text className="text-white text-center text-lg bg-[#12CDD9] py-4 rounded-full">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default login;
