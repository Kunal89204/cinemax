import { View, Text, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import movieRequests from "@/apis/movieRequests";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const NowPlayingMovieCard = ({ movie }: { movie: any }) => {
  return (
    <View style={{ width: 150, height: 220, backgroundColor: "#ef4444", marginRight: 16, borderRadius: 50, position: "relative" }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={{ width: "100%", height: "100%",borderRadius: 20, }}
      />

      {/* Rating Badge */}
      <View
        style={{
          position: "absolute",
          top: 4,
          right: 8,
          paddingHorizontal: 4,
          borderRadius: 10,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Ionicons name="star" size={10} color="orange" />
        <Text style={{ color: "orange", padding: 3, fontSize: 10 }}>
          {movie.vote_average.toFixed(1)}
        </Text>
      </View>
        <Text style={{ color: "white", padding: 8 }}>{movie.title}</Text>
    </View>
  );
};

const NowPlayingMovies = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: () => movieRequests.getNowPlayingMovies(),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {(error as Error).message}</Text>;
  }

  return (
    <View style={{ paddingVertical: 16 }}>
      <Text style={{ color: "white", marginBottom: 16, fontSize: 18, fontWeight: "600" }}>Now Playing</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          {data?.results.map((movie: any) => (
            <NowPlayingMovieCard movie={movie} key={movie.id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default NowPlayingMovies;