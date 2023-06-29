import { API_KEY } from "@env";

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?language=en-US`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?language=en-US`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?language=en-US`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}?language=en-US`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?language=en-US`;
const movieSimilarEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?language=en-US`;

const searchMoviesEndpoint = (param) =>
  `${apiBaseUrl}/search/movie?query=${param}&include_adult=false&page=1&language=en-US`;

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?language=en-US`;

const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?language=en-US`;

export const fallbackMoviePoster =
  "https://img.mylove.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await fetch(endpoint, options);
    return response.json();
  } catch (error) {
    console.error(err);
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchMoviesDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMoviesCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(movieSimilarEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovie = (param) => {
  return apiCall(searchMoviesEndpoint(param));
};
