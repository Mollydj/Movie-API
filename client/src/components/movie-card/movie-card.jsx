import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//export means it can be imported from another place
export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;

    return (
      <Card className="m-2 mw 18rem" border="dark">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="text-green">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            onClick={() => onClick(movie)}
            variant="link"
            className="text-orange"
          >
            read more
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
