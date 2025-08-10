import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { IAccountDetails } from "@/types/user";

const HeaderProfile = ({ data }: { data: IAccountDetails }) => {
  return (
    <View style={{ backgroundColor: "#1F1D2B" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          padding: 16,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data?.avatar?.tmdb?.avatar_path}`,
            }}
            resizeMode="cover"
            style={{ width: 40, height: 40, borderRadius: 100 }}
          />
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Hello, {data.username}
            </Text>
            <Text
              style={{
                color: "#92929D",
                fontSize: 14,
              }}
            >
              Let's stream your favorite movie
            </Text>
          </View>
        </View>
        <Ionicons
          name="heart"
          size={24}
          color="red"
          backgroundColor="#242632"
          style={{
            borderRadius: 6,
            padding: 4,
          }}
        />
      </View>
    </View>
  );
};

export default HeaderProfile;
