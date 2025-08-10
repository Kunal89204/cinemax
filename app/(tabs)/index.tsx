import { View, Text, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import userRequests from "@/apis/userRequests";
import { useStore } from "@/context/store";
import { Ionicons } from "@expo/vector-icons";
import HeaderProfile from "@/components/home/HeaderProfile";
import SearchBar from "@/components/home/SearchBar";
import PopularMovies from "@/components/home/PopularMovies";
import { ScrollView } from "react-native";
import HeaderCarousel from "@/components/home/HeaderCarousel";
import TopRated from "@/components/home/TopRated";
import PopularTvShows from "@/components/home/PopularTvShows";
import LatestTvShows from "@/components/home/LatestTvShows";
import NowPlayingMovies from "@/components/home/NowPlayingMovies";

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
    <ScrollView className="flex-1 bg-[#1F1D2B]">
      <HeaderProfile data={data} />
      <SearchBar />
      <HeaderCarousel />
      <TopRated />
      <PopularMovies />
      <PopularTvShows />
      <NowPlayingMovies />
      <LatestTvShows />
    </ScrollView>
  );
};

export default Home;
