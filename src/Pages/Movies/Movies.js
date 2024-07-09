import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../../components/Pagination/CustomPagination";

/**
 * This creates a Movie page and fetches API content on movies
 */
const Movies = () => {
  const [genres, setGenres] = useState([]); // State variable to store the list of genres
  const [selectedGenres, setSelectedGenres] = useState([]); // State variable to store the selected genres
  const [page, setPage] = useState(1); // State variable to store the current page number
  const [content, setContent] = useState([]); // State variable to store the fetched movie content
  const [numOfPages, setNumOfPages] = useState(); // State variable to store the total number of pages
  const genreforURL = useGenre(selectedGenres); // Custom hook to convert selected genres into URL format

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    ); // Fetch movies from the API based on selected genres and page number
    setContent(data.results); // Update the content state with the fetched movie data
    setNumOfPages(data.total_pages); // Update the numOfPages state with the total number of pages
  };

  useEffect(() => {
    window.scroll(0, 0); // Scroll to the top of the page when the component mounts or when the dependencies change
    fetchMovies(); // Fetch movies when the component mounts or when the dependencies change
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span> {/* Page title */}
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      /> {/* Component to select genres */}
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))} {/* Render the fetched movie content */}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )} {/* Render pagination component if there are more than 1 page */}
    </div>
  );
};

export default Movies;
