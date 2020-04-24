import React from 'react';

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';

import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
import { LogoutView } from '../logout-view/logout-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateUser } from '../update-view/update-profile';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      profile: [],
      user: []
    };
  }

  // One of the "hooks" available in a React Component


  getMovies(token) {
    axios.get('https://ach2.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getUsers(token) {
    axios.get(`https://ach2.herokuapp.com/users/${localStorage.getItem('user')}`, {

      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          profile: response.data

        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);//after user logged in get movie data
      this.getUsers(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUsers(authData.token);
  }

  render() {
    const { movies, user, profile, onLoggedOut } = this.state;
    // Before the movies have been loaded
    console.log(profile.Username)
    console.log(profile.Email)
    console.log(profile.Birthday)



    return (
      <Router>
        <Navbar expand="lg" variant="light" className="Navstyle">
          <Container>
            <Navbar.Brand href="/" className="fancy">Myflix</Navbar.Brand>
            <Link className="fancy" to={`/users/${user}`}> {user} </Link>
          </Container>

        </Navbar>



        <div className="main-view align justify-content-center">
          <Route exact path="/" render={() => {
            if (!user || user.length === 0) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }
          } />
          <Route path="/register" render={() => <RegistrationView />} />

          <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m} />)} />

          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

          <Route exact path="/genres/:name" render={({ match }) => {
            if (!movies || movies.length === 0) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} movies={movies} />
          }
          } />

          <Route exact path="/directors/:name" render={({ match }) => {
            if (!movies || movies.length === 0) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} />
          }
          } />

          <Route exact path="/users/:Username" render={({ match }) => {
            if (!profile || profile.length === 0) return <div className="main-view" />;
            return <ProfileView profile={profile} user={user} movies={movies} />
          }
          } />

          <Route path="/logout" render={() =>
            <LoginView />
          } />

          <Route exact path="/update/:Username" render={() => <UpdateUser profile={profile} user={user} />} />



        </div>
      </Router>

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

};
