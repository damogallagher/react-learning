import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import MovieListHeading from './components/MovieListHeading/MovieListHeading';
import SearchBox from './components/SearchBox/SearchBox';
import AddFavourites from './components/AddToFavourites/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites/RemoveFavourites';
import Modal from './components/UI/Modal/Modal';
import Spinner from './components/UI/Spinner/Spinner';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  const getMovieRequest = async (searchValue) => {
    setLoading(true);
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d1f910b`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      console.log('pre set movies');
      setMovies(responseJson.Search);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    let movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'));

    if (movieFavourites === null) {
      movieFavourites = [];
    }
    setFavourites(movieFavourites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    console.log('movie:', movie);

    const returnedMovie = favourites.filter((m) => m.imdbID === movie.imdbID);
    console.log('returnedMovie:', returnedMovie);
    if (returnedMovie !== null && returnedMovie.length > 0) {
      console.log('Movie already added to favourites');
      setError(true);
      setErrorMessage('This movie is already set as a favourite');
      return;
    }


    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID,
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeModalHandler = () => {
    setError(false);
    setErrorMessage(null);
  };

  let modalMessage = null;
  if (error) {
    modalMessage = (
      <Modal show={error} modalClosed={removeModalHandler}>
        {errorMessage}
      </Modal>
    );
  }

  const spinner = loading ? <Spinner /> : null;

  return (
    <div className='container-fluid movie-app'>
      {spinner}
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
        {modalMessage}
      </div>
    </div>
  );
};

export default App;
