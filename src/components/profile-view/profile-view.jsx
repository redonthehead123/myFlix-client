import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "https://big-beautiful-movie-c7f24c55b7b8.herokuapp.com";

export function ProfileView({ username: propUsername, token: propToken, movies = [], onUserUpdated }) {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const username = propUsername || (() => { try { return JSON.parse(localStorage.getItem("user"))?.Username } catch (e) { return null } })();
  const authHeader = propToken || localStorage.getItem("token") ? { Authorization: `Bearer ${propToken || localStorage.getItem("token")}` } : {};

  useEffect(() => {
    if (!username) {
      setError("No logged-in user found.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/users/${encodeURIComponent(username)}`, { headers: { Accept: "application/json", ...authHeader } });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data = await res.json();
        setUser(data);
        setForm({ Username: data.Username || "", Email: data.Email || "", Birthday: data.Birthday ? data.Birthday.split("T")[0] : "" });
        if (onUserUpdated) onUserUpdated(data);
      } catch (err) {
        setError("Failed to load user data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, propToken]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/users/${encodeURIComponent(user.Username)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeader },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const updated = await res.json();
      setUser(updated);
      if (onUserUpdated) onUserUpdated(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const removeFav = async (movieId) => {
    if (!user) return;
    try {
      const res = await fetch(`${API_URL}/users/${encodeURIComponent(user.Username)}/movies/${encodeURIComponent(movieId)}`, { method: "DELETE", headers: authHeader });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const updated = await res.json();
      setUser(updated);
      if (onUserUpdated) onUserUpdated(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      alert("Removed from favorites");
    } catch (err) {
      console.error(err);
      alert("Could not remove favorite: " + err.message);
    }
  };

  if (loading) return <div className="text-center py-4"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="m-3">{error}</Alert>;
  if (!user) return <Alert variant="warning" className="m-3">No user data</Alert>;

  const favoriteMovies = movies.filter((m) => (user.FavoriteMovies || []).includes(m._id || m.id));

  return (
    <Container className="py-3">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>{user.Username}</Card.Title>
              <Card.Text><strong>Email:</strong> {user.Email}</Card.Text>
              <Card.Text><strong>Birthday:</strong> {user.Birthday ? new Date(user.Birthday).toLocaleDateString() : "-"}</Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Favorites</Card.Title>
              <ListGroup variant="flush">
                {favoriteMovies.length ? favoriteMovies.map(m => (
                  <ListGroup.Item key={m._id || m.id} className="d-flex justify-content-between align-items-center">
                    <Link to={`/movies/${m._id || m.id}`}>{m.Title || m.title}</Link>
                    <Button variant="outline-danger" size="sm" onClick={() => removeFav(m._id || m.id)}>Remove</Button>
                  </ListGroup.Item>
                )) : <div>No favorites yet</div>}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Edit Profile</Card.Title>
              <Form onSubmit={handleSave}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control name="Username" value={form.Username} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="Email" value={form.Email} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control type="date" name="Birthday" value={form.Birthday} onChange={handleChange} />
                </Form.Group>

                <Button type="submit" variant="primary" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}