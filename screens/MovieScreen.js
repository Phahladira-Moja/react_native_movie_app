import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchMoviesCredits,
  fetchMoviesDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  let movieName = "Ant-Man and the Wasp: Quantumania";

  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // call the movie detail api
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMoviesDetails(id);

    if (data) setMovie(data);

    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMoviesCredits(id);

    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);

    if (data && data.results) setSimilarMovies(data.results);
  };

  var { width, height } = Dimensions.get("window");
  const ios = Platform.OS == "ios";
  const topMargin = ios ? "" : "mt-3";

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <HeartIcon
              size="35"
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>

        {/* status, release, runtime  */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot && "•"}
              </Text>
            );
          })}
        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      {/* cast */}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* similar movies */}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
