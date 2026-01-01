# myFlix Client

A React-based single-page application (SPA) for browsing movies, managing user profiles, and maintaining a list of favorite films. This client consumes the [big-beautiful-movie-api](https://github.com/redonthehead123/myFlix-client) backend.

## Features

- **User Authentication** — Sign up and log in with JWT-based authentication
- **Movie Browsing** — View a collection of movies with details including title, director, genre, and description
- **Movie Filtering** — Real-time search to filter movies by title
- **Favorite Movies** — Add or remove movies from your personal favorites list
- **User Profile** — View and update your profile information
- **Responsive Design** — Built with React Bootstrap for mobile-friendly layouts
- **Single-Page Navigation** — React Router for seamless client-side routing

## Tech Stack

- **React** 19.2.3 — Component-based UI library
- **React Router DOM** 7.10.1 — Client-side routing
- **React Bootstrap** 2.10.10 — UI components and styling
- **Axios** 1.13.2 — HTTP requests to the backend API
- **Parcel** 2.16.0 — Fast, zero-config bundler
- **Sass** — CSS preprocessing via `@parcel/transformer-sass`

## Prerequisites

- Node.js (14+ recommended)
- npm (comes with Node.js)
- A running instance of the [big-beautiful-movie-api](https://github.com/redonthehead123/big-beautiful-movie-api) backend

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/redonthehead123/myFlix-client.git
   cd myFlix-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

Start the development server with Parcel:

```bash
parcel src/index.html
```

The app will be available at `http://localhost:1234` by default.

### API Configuration

The app is currently configured to fetch data from:
```
https://big-beautiful-movie-c7f24c55b7b8.herokuapp.com/movies
```

If you need to connect to a different API endpoint (e.g., localhost), update the fetch URL in [src/components/main-view/main-view.jsx](src/components/main-view/main-view.jsx).

## Project Structure

```
myFlix-client/
├── src/
│   ├── components/
│   │   ├── login-view/          # User login form
│   │   ├── signup-view/         # User registration form
│   │   ├── main-view/           # Main app container with routing
│   │   ├── movie-card/          # Movie card component for grid display
│   │   ├── movie-view/          # Detailed single movie view
│   │   ├── profile-view/        # User profile and favorites management
│   │   └── navigation-bar/      # Top navigation bar
│   ├── index.html               # HTML entry point
│   ├── index.jsx                # React app root
│   └── index.scss               # Global styles
├── netlify.toml                 # Netlify deployment config
└── package.json                 # Dependencies and scripts
```

## Available Routes

- `/` — Home page with movie grid (requires login)
- `/login` — Login page
- `/signup` — User registration page
- `/movies/:movieId` — Individual movie details
- `/profile` — User profile and favorites

## Key Components

### MainView
The primary container component that manages:
- Authentication state (user, token)
- Movie data fetching
- Movie filtering functionality
- React Router routing logic

### MovieCard
Displays a movie as a card in the grid with title and image. Clicking navigates to the detailed movie view.

### MovieView
Shows full movie details including description, director, and genre. Uses React Router's `useParams` hook to get the movie ID from the URL.

### ProfileView
Allows users to:
- View their account information
- Update profile details
- See their favorite movies
- Remove favorites
- Delete their account

### NavigationBar
Top navigation with links to Home, Profile, and Logout (when authenticated).

## Deployment

The project includes a `netlify.toml` configuration file for easy deployment to Netlify:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect Parcel and build the project
3. The redirect rule in `netlify.toml` ensures React Router works correctly

**Build Command:** `npx parcel build src/index.html`  
**Publish Directory:** `dist`

## Development Notes

- **No Tests:** Test scripts are not currently configured. Add Jest or React Testing Library if needed.
- **Authentication Persistence:** Tokens are stored in `localStorage` for session persistence.
- **CORS:** Ensure your API allows requests from your client's origin (`http://localhost:1234` for development, and your Netlify URL for production).

## Links

- **GitHub Repository:** https://github.com/redonthehead123/myFlix-client
- **Backend API:** https://github.com/redonthehead123/big-beautiful-movie-api
