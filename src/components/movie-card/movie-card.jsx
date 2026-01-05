import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite = false, onToggleFavorite, user }) => {
  return (
    <Card className="h-100">
      {movie.image ? (
        <Card.Img variant="top" src={movie.image} alt={movie.title} />
      ) : (
        <div style={{ height: "200px", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
          No poster available
        </div>
      )}
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button as={Link} to={`/movies/${movie.id}`} variant="button">
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
    director: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onToggleFavorite: PropTypes.func,
  user: PropTypes.object,
};