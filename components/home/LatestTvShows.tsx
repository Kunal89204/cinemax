import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import tvRequests from "@/apis/tvRequests";

export const LatestTvShowCard = ({ tvShow }: { tvShow: any }) => {
  return (
    <View
      style={{
        width: 250,
        height: 150,
        marginRight: 16,
        borderRadius: 20,
        position: "relative",
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`,
        }}
        style={{ width: "100%", height: "100%", borderRadius: 20 }}
      />
    </View>
  );
};

const LatestTvShows = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latestTvShows"],
    queryFn: () => tvRequests.getLatestTvShows(),
  });
  
  return (
    <View>
      <Text
        style={{
          color: "white",
          marginBottom: 16,
          marginTop: 16,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Latest Tv Shows{" "}
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.results?.map((tvShow: any) => (
          <LatestTvShowCard tvShow={tvShow} key={tvShow.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default LatestTvShows;
