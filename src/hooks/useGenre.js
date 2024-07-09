// This custom hook takes an array of selected genres and returns a string of genre IDs separated by commas
const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
  
    const GenreIds = selectedGenres.map((g) => g.id);
    return GenreIds.reduce((acc, curr) => acc + "," + curr);
  };
  
  export default useGenre;
