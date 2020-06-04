import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  addFavorite(MovieId) {
    axios.post(`https://ach2.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${MovieId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }

    })
      .then(response => {
        document.location.reload(true);
        console.log('movie favorited')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: '25rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="fancy">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link" className="fancy">Open</Button>
          </Link>
          <Button className="fancy" onClick={e => this.addFavorite(movie._id)}>Favorite</Button>




        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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