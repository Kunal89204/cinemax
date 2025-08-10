import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import movieRequests from "@/apis/movieRequests";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;

export const HeaderCarouselCard = ({ movie }: { movie: any }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#242632",
        borderRadius: 30,
        overflow: "hidden",
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }}
        style={{ width: "100%", height: "100%", borderRadius: 12 }}
        resizeMode="contain"
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 8,
          zIndex: 1000,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
          numberOfLines={1}
        >
          {movie.title}
          <Text
            style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
            numberOfLines={1}
          >
            {movie.release_date}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const HeaderCarousel = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () => movieRequests.getUpcomingMovies(),
  });

  if (isLoading) {
    return <Text style={{ color: "white", padding: 16 }}>Loading...</Text>;
  }

  if (isError) {
    return (
      <Text style={{ color: "white", padding: 16 }}>
        Error: {(error as Error).message}
      </Text>
    );
  }

  return (
    <View style={{ paddingVertical: 16 }}>
      <Carousel
        ref={ref}
        width={width * 0.9}
        height={200}
        style={{
          width: width,
          justifyContent: "center",
        }}
        data={data?.results || []}
        onProgressChange={progress}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 40,
          parallaxAdjacentItemScale: 0.85,
        }}
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={3000}
        renderItem={({ item: movie }) => (
          <View style={{ paddingHorizontal: 6 }}>
            <HeaderCarouselCard movie={movie} />
          </View>
        )}
      />
    </View>
  );
};

export default HeaderCarousel;
