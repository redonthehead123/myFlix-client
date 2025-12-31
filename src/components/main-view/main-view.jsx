import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `${window.location.protocol}//localhost:8080/movies`; 
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            author: doc.author_name?.[0],
          };
        });

        setMovies(moviesFromApi);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch movies:", err);
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter((m) =>
    m.title?.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 && loading ? (
        <div>Loading movies...</div>
      ) : movies.length === 0 && !loading ? (
        <div>The list is empty</div>
      ) : (
        <>
          <Col md={8} className="mb-3">
            <input
              type="text"
              placeholder="Filter movies by title..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-control"
            />
          </Col>
          {filteredMovies.length === 0 ? (
            <div>No movies match your filter.</div>
          ) : (
            <>
              {filteredMovies.map((movie) => (
                <Col className="mb-4" key={movie.id} md={3}>
                  <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
            </>
          )}
        </>
      )}
    </Row>
  );
};
