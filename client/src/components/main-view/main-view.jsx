import React, { Profiler } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { LogoutView } from "../login-view/logout-view";
import { NewUser } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view"
import { NavBar } from "../navbar-view/navbar-view";



export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null

    };
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

  getUsers(token) {
    axios.get('http://ach2.herokuapp.com/users/:Username', {
      headers: { Authorization: `Bearer ${token}` }
      //By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          user: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount(token) {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);

    }
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

  onLoggedOut(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
  }


  logout() {
    localStorage.clear();
    console.log('user logged out');
  }



  render() {
    const { movies, user } = this.state;

    var logout = this.logout();

    return (
      <div className="main-view">
        <Router>

          <nav className="navbar navbar-light bg-light navbar-expand-sm">
            <Link to="/" className="navbar-brand">
              <h1>MyFlix</h1>
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto text-orange">
                <li className="navbar-item">
                  <Link to={`/users/:Username`}>
                    <Button variant="link" className="text-dark">Profile</Button>
                  </Link>
                  <Link to={`/logout`}>
                    <Button variant="link" className="text-dark" onClick={logout}>Logout</Button>
                  </Link>
                </li>
              </ul>
              {user}
            </div>
          </nav>

          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }
          } />

          <Route path="/register" render={() => <NewUser />} />

          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }
          } />
          <Route exact path="/Genres/:name" render={({ match }) => {
            if (!movies || movies.length === 0) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} />
          }
          } />

          <Route path="/users/:Username" render={() => <ProfileView />} />


          <Route path="/logout" render={() => <LogoutView />} />

        </Router>
      </div >
    );
  }
}


MainView.propTypes = {

  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      Title: PropTypes.string,
      ReleaseYear: PropTypes.string,
      ImagePath: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string
      }),
      Featured: PropTypes.boolean,
      Actors: PropTypes.array
    })
  ),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      password: PropTypes.string,
      email: PropTypes.string,
      Birthday: PropTypes.string,
    })
  )
}


