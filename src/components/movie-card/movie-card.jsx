import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <Card.Img varient="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} varian="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

// Defines all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string.isRequired,
    director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};