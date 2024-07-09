import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenre from "../../hooks/useGenre";

/**
 * This component fetches the API information for Series content
 * Creates a genre classification and handles actions on click
 */
const Series = () => {
  const [genres, setGenres] = useState([]); // State to store the list of genres
  const [selectedGenres, setSelectedGenres] = useState([]); // State to store the selected genres
  const [page, setPage] = useState(1); // State to store the current page number
  const [content, setContent] = useState([]); // State to store the fetched content
  const [numOfPages, setNumOfPages] = useState(); // State to store the total number of pages
  const genreforURL = useGenre(selectedGenres); // Custom hook to generate genre IDs for the API URL

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results); // Update the content state with the fetched data
    setNumOfPages(data.total_pages); // Update the numOfPages state with the total number of pages
  };

  useEffect(() => {
    window.scroll(0, 0); // Scroll to the top of the page when the component mounts or when the genre or page changes
    fetchSeries(); // Fetch series data
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
