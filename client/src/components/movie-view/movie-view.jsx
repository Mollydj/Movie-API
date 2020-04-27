import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { connect } from 'react-redux';
export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (

      <Container className="bg-light">
        <Row className="justify-content-md-center">
          <Col xs={12} sm={10} md={10}>
            <div className="movie-title">
              <Image className="img-responsive center-block" src={movie.ImagePath} fluid /><br />
              <h1 className="label fancy">{movie.Title} </h1>
            </div>

            <div className="movie-genre">
              <span className="label fancy">Genre: </span>
              <span className="value fancy">{movie.Genre.Name}</span>
            </div>

            <div className="movie-director">
              <span className="label fancy">Director: </span>
              <span className="value fancy">{movie.Director.Name}</span>
            </div>

            <div className="movie-description">
              <span className="value">{movie.Description}</span>
            </div>



            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>

            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </Col>
        </Row>
      </Container>


    );
  }
}
export default connect(({ movies }) => ({ movies }))(MovieView);