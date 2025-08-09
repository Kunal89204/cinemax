import { View, Text, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View
      style={{
        backgroundColor: "#1F1D2B",
        padding: 2,
        paddingHorizontal: 24,
        position: "relative",
      }}
    >
      <Ionicons
        name="search"
        size={18}
        color="#92929D"
        style={{
          position: "absolute",
          left: 40,
          top: 15,
          zIndex: 100,
        }}
      />

      <TextInput
        placeholder="Search"
        placeholderTextColor="#92929D"
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          borderRadius: 60,
          padding: 12,
          paddingLeft: 40,
          backgroundColor: "#242632",
        }}
      />


    </View>
  );
};

export default SearchBar;
