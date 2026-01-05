import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick, isFavorite = false, onToggleFavorite, user }) => {
  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <button 
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer"}}
      >
        Back
      </button>
    </div>
  );
};

import PropTypes from 'prop-types';

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
  user: PropTypes.object,
};
