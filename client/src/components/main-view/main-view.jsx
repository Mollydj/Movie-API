import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { LoginView } from "../login-view/login-view";
import { NewUser } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newbie: null
    };
  }

  componentDidMount() {
    axios
      .get('http://ach2.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onNewUser(newbie) {
    this.setState({
      newbie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('http://ach2.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
      //By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, selectedMovie, user, newbie } = this.state;

    if (!newbie)
      return <NewUser onNewUser={newbie => this.onNewUser(newbie)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view card-columns">
        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
        ) : (
            movies.map(movie => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onClick={movie => this.onMovieClick(movie)}
              />
            ))
          )}
      </div>
    );
  }
}

MainView.propTypes = {
  movies: PropTypes.string,
  selectedMovie: PropTypes.string,
  user: PropTypes.string,
  newbie: PropTypes.string
}.isRequired, {
  onClick: PropTypes.func.isRequired
};
