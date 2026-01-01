import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://big-beautiful-movie-c7f24c55b7b8.herokuapp.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const movieArray = Array.isArray(data) ? data : [];
        const moviesFromApi = movieArray.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            director: doc.Director?.Name || doc.director || '',
            description: doc.Description || doc.description || '',
            genre: doc.Genre?.Name || (doc.genre && doc.genre.Name) || ''
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((err) => {
        console.error("Failed to fetch movies", err);
        setMovies([]);
      });
  }, []);

  const filteredMovies = filter.trim() === "" 
    ? movies 
    : movies.filter((m) =>
        m.title?.toLowerCase().includes(filter.trim().toLowerCase())
      );

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )}
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                  }}
                  />
                </Col>
              )}
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    onUserUpdated={(updatedUser) => setUser(updatedUser)}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                    }}
                  />
                </Col>
              )}
            </>
          }
        />

        <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
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
                      <Col>No movies match your filter.</Col>
                    ) : (
                      <>
                        {filteredMovies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
