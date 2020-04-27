import React from 'react';
import axios from 'axios';
import { setMovies, profile, setFilter } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";

import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { movies } = state;
  return { movies };

};


export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getUsers(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  getUsers(token) {
    axios.get(`https://ach2.herokuapp.com/users/${localStorage.getItem('user')}`, {

      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  deregister() {
    axios.delete(`https://ach2.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/client', '_self');
        this.setState({
          user: null
        });

        console.log('user deleted')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteMovie(MovieId) {
    axios.delete(`https://ach2.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${MovieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        document.location.reload(true);
        console.log('movie deleted')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { Username, Email, Birthday, FavoriteMovies } = this.state;
    const { movies } = this.props;
    const userFaves = movies.filter(g => FavoriteMovies.includes(g._id))
    const birthday = Date()

    return (
      <div>
        <Container className="bg-light">
          <Link to={`/update/${Username}`}>
            <Button variant="link" className="float-right">Edit Profile</Button>
          </Link>
          <Row>
            <Col>
              <h2 className="fancy">Profile</h2>
              <div className="pretty">
                Username:            {Username}<br />
            Email:            {Email}<br />
            Birthday:        {Birthday}<br /><br />


                <h3 className="fancy">Favorite Movies</h3>

                {userFaves.map((movie, i) =>
                  <Card style={{ width: '10rem' }} md={4}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Card.Title className="fancy">{movie.Title}</Card.Title>
                      <Button className="fancy" onClick={e => this.deleteMovie(movie._id)}>delete</Button>
                    </Card.Body>
                  </Card>
                )}

              </div>
              <Link to={`/logout`}>
                <Button variant="link" onClick={this.onLoggedOut}>Logout</Button>
              </Link>

              <Link to={`/`}>
                <Button variant="link">Back to Movies</Button>
              </Link>

              <Link to={`/`} >
                <Button variant="danger" onClick={this.deregister}>Delete Account</Button>
              </Link>

            </Col>
          </Row>
        </Container>
      </div >
    )
  }
}

export default connect(mapStateToProps, { setMovies, profile, setFilter })(ProfileView);
