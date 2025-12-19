import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick, isFavorite = false, onToggleFavorite, user }) => {
  return (
    <Card className="h-100">
      <Card.Img varient="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>

        <Button
          onClick={() => onToggleFavorite && onToggleFavorite(movie)}
          variant={isFavorite ? 'warning' : 'outline-secondary'}
          aria-pressed={isFavorite}
          disabled={!user}
          title={user ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Log in to add favorites'}
        >
          {isFavorite ? '★ Favorite' : '☆ Favorite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

// Defines all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
or: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};