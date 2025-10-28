import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
      {
        id: 1,
        title: "Inception",
        description:
          "A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his criminal record by planting an idea into someone’s mind.",
        image: "https://m.media-amazon.com/images/I/91NfRz4k1GL._AC_SY679_.jpg",
        genre: "Science Fiction",
        director: "Christopher Nolan",
      },
      {
        id: 2,
        title: "The Dark Knight",
        description:
          "Batman faces his greatest psychological and physical tests when the Joker emerges as a new criminal mastermind in Gotham.",
        image: "https://m.media-amazon.com/images/I/51AJ1ZKQF8L._AC_.jpg",
        genre: "Action",
        director: "Christopher Nolan",
      },
      {
        id: 3,
        title: "Pulp Fiction",
        description:
          "Interwoven stories of crime and redemption in Los Angeles come together in Quentin Tarantino’s iconic non-linear masterpiece.",
        image: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
        genre: "Crime",
        director: "Quentin Tarantino",
      },
      {
        id: 4,
        title: "Jurassic Park",
        description:
          "A group of visitors must survive the collapse of a dinosaur theme park after cloned dinosaurs break loose.",
        image: "https://m.media-amazon.com/images/I/81zM2tMZo6L._AC_SY679_.jpg",
        genre: "Science Fiction",
        director: "Steven Spielberg",
      },
      {
        id: 5,
        title: "Interstellar",
        description:
          "A group of astronauts travel through a wormhole in search of a new home for humanity as Earth faces extinction.",
        image: "https://m.media-amazon.com/images/I/71nDPy8pG+L._AC_SY679_.jpg",
        genre: "Science Fiction",
        director: "Christopher Nolan",
      },
      {
        id: 6,
        title: "Django Unchained",
        description:
          "A freed slave sets out to rescue his wife from a brutal plantation owner with the help of a German bounty hunter.",
        image: "https://m.media-amazon.com/images/I/71Q0Y-ZX0nL._AC_SY679_.jpg",
        genre: "Western",
        director: "Quentin Tarantino",
      },
      {
        id: 7,
        title: "E.T. the Extra-Terrestrial",
        description:
          "A gentle alien stranded on Earth befriends a young boy and his siblings, leading to a touching adventure to help him return home.",
        image: "https://m.media-amazon.com/images/I/71L3O5L-sdL._AC_SY679_.jpg",
        genre: "Family",
        director: "Steven Spielberg",
      },
      {
        id: 8,
        title: "Schindler’s List",
        description:
          "The true story of Oskar Schindler, a German industrialist who saved over a thousand Jews during the Holocaust.",
        image: "https://m.media-amazon.com/images/I/71U0c1xOZbL._AC_SY679_.jpg",
        genre: "Drama",
        director: "Steven Spielberg",
      },
      {
        id: 9,
        title: "Kill Bill: Volume 1",
        description:
          "A deadly assassin, betrayed by her team, awakens from a coma and begins her quest for bloody revenge.",
        image: "https://m.media-amazon.com/images/I/71xZ0n77L8L._AC_SY679_.jpg",
        genre: "Action",
        director: "Quentin Tarantino",
      },
      {
        id: 10,
        title: "Saving Private Ryan",
        description:
          "During World War II, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
        image: "https://m.media-amazon.com/images/I/71bG+RZgUBL._AC_SY679_.jpg",
        genre: "War",
        director: "Steven Spielberg",
      },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
