import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (e) {
      console.error("Failed to read stored user", e);
    }
  }, []);

  useEffect(() => {
    fetch("https://big-beautiful-movie-c7f24c55b7b8.herokuapp.com/movies")
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Movies data received:", data);
        const moviesFromApi = data.map((doc) => {
          console.log("ImageURL:", doc.ImageURL);
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImageURL,
            director: doc.Director?.Name || doc.director || '',
            description: doc.Description || doc.description || '',
            genre: doc.Genre?.Name || (doc.genre && doc.genre.Name) || ''
          };
        });

        console.log("Mapped movies:", moviesFromApi);
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const filteredMovies = filter.trim() === "" 
    ? movies 
    : movies.filter((m) =>
        m.title?.toLowerCase().includes(filter.trim().toLowerCase())
      );

  const isFavorite = (movieId) => {
    const favs = user?.FavoriteMovies || [];
    return favs.includes(movieId);
  };

  const toggleFavorite = async (movie) => {
    if (!user || !token) return;
    const movieId = movie.id || movie._id;
    const url = `https://big-beautiful-movie-c7f24c55b7b8.herokuapp.com/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movieId)}`;
    const method = isFavorite(movieId) ? "DELETE" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const updatedUser = await res.json();
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Favorite toggle failed", err);
      alert("Could not update favorites: " + err.message);
    }
  };

  const MovieRoute = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const movie = movies.find((m) => m.id === movieId || m._id === movieId);

    if (!movie) {
      return <Col>Movie not found.</Col>;
    }

    return (
      <Col md={8}>
        <MovieView movie={movie} onBackClick={() => navigate(-1)} />
      </Col>
    );
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
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
                  <MovieRoute />
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
                            <MovieCard
                              movie={movie}
                              user={user}
                              isFavorite={isFavorite(movie.id)}
                              onToggleFavorite={toggleFavorite}
                            />
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
