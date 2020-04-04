import React from "react";
import axios from "axios";

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
      .get("https://ach2.herokuapp.com/movies")
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

  onLoggedIn(user) {
    this.setState({
      user
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

