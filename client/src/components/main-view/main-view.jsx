import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';
import MoviesList from '../movies-list/movies-list';
import { setMovies, profile } from '../../actions/actions';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { LoginView } from '../login-view/login-view';
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
      profile: {},
      user: null
    };
  }

  // One of the "hooks" available in a React Component
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

  getMovies(token) {
    axios.get('https://ach2.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
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
        this.props.profile(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }



  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    // this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUsers(authData.token);
  }

  render() {
    // const { movies, user, profile, onLoggedOut } = this.state;
    let { movies } = this.props;
    let { user, profile } = this.state;



    return (

      <Router>
        <Navbar expand="lg" variant="light" className="Navstyle">
          <Container>
            <Navbar.Brand href="/" className="fancy">Myflix</Navbar.Brand>
            <Link className="fancy" to={`/users/${user}`}> {user} </Link>
          </Container>

        </Navbar>
        <div className="main-view align justify-content-center">
          <Row>
            <Col>

              <Route exact path="/" render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return <MoviesList movies={movies} />;
              }} />
              <Route path="/register" render={() => <RegistrationView />} />

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
                if (!user || user.length === 0) return <div className="main-view" />;
                return <ProfileView user={user} movies={movies} />
              }
              } />


              <Route exact path="/update/:Username" render={() => <UpdateUser user={user} />} />


              <Route path="/logout" render={() =>
                <LoginView />
              } />
            </Col></Row>
        </div>
      </Router>

    );
  }
}

// #3
let mapStateToProps = state => {
  return {
    movies: state.movies,
  }
}

// #4
export default connect(mapStateToProps, { setMovies, profile })(MainView);
