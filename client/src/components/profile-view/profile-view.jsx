import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { MainView } from '../main-view/main-view';
export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.open('/', '_self');
  }

  deregister() {
    axios.delete(`https://ach2.herokuapp.com/users/${localStorage.getItem('user')}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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
    const userMovies = (this.props.movies.filter(g => this.props.profile.FavoriteMovies.includes(g._id)))
    return (
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <h2 className="fancy">Profile</h2>

          <div className="pretty">
            Username:            {this.props.profile.Username}<br />
            Password:           <br />
            Email:            {this.props.profile.Email}<br />
            Birthday:            {this.props.profile.Birthday}<br />
            <h3 className="fancy">Favorite Movies</h3>
            <ul className="ml- pl-0 card-body d-flex flex-row align justify-content-center">
              {userMovies.map(movie =>
                (
                  <li key={movie._id} className="mb-2 ">
                    <Card style={{ width: '10rem' }}>
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Card.Title className="fancy">{movie.Title}</Card.Title>


                        <Button className="fancy" onClick={e => this.deleteMovie(movie._id)}>delete</Button>



                      </Card.Body>
                    </Card>
                  </li>
                ))}
            </ul>
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

          <Link to={`/updateUser`}>
            <Button variant="link" className="pull-right">Edit Profile</Button>
          </Link>
        </Card.Body>
      </Card >
    )
  }
}