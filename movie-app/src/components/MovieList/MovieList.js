import React from 'react';
import PropTypes from 'prop-types';

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  let movies = null;
  if (props.movies) {
    movies = (
      props.movies.map((movie, index) => (
        <div className='image-container d-flex justify-content-start m-3' key={movie.imdbID}>
          <img src={movie.Poster} alt='movie'></img>
          <div
            onClick={() => props.handleFavouritesClick(movie)}
            className='overlay d-flex align-items-center justify-content-center'
            id='action'
          >
            <FavouriteComponent />
          </div>
        </div>
      ))
    );
  }

  return (
    <React.Fragment>
      {movies}
    </React.Fragment>
  );
};
MovieList.propTypes = {
  favouriteComponent: PropTypes.func,
  movies: PropTypes.array,
  handleFavouritesClick: PropTypes.func,
};
export default MovieList;
