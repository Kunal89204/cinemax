import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import movieRequests from "@/apis/movieRequests";
import { Ionicons } from "@expo/vector-icons";

const TopRatedMovieCard = ({ movie, index }: { movie: any; index: number }) => {
  return (
    <View
      style={{
        width: 150,
        height: 220,
        backgroundColor: "#ef4444",
        marginRight: 16,
        borderRadius: 50,
        position: "relative",
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 25,
          borderTopLeftRadius: 0,
        }}
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

      {/* Position Badge */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "orange",
          padding: 8,
          borderRadius: 50,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          width: 40,
        }}
      >
        <Text
          style={{
            color: "white",
            padding: 0,
            backgroundColor: "transparent",
            fontSize: 20,
          }}
        >
          {index + 1}
        </Text>
      </View>
      <Text style={{ color: "white", padding: 8 }}>{movie.title}</Text>
    </View>
  );
};

const TopRated = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => movieRequests.getTopRatedMovies(),
  });

  return (
    <View style={{ paddingVertical: 16 }}>
      <Text
        style={{
          color: "white",
          marginBottom: 16,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Top Rated
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.results.slice(0, 10).map((movie: any, index: number) => (
          <TopRatedMovieCard movie={movie} key={movie.id} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TopRated;
