import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";

//export means it can be imported from another place
export class DirectorView extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { director, movie } = this.props;

    if (!director) return null;
    return (
      <div className="director-view">

        <Card style={{ width: '34rem' }}>
          <Card.Body>
            <Card.Title><h1>{director.Name}</h1></Card.Title>
            <Card.Title><h4>{director.Birth} – {director.Death}</h4></Card.Title>
            <Card.Text>
              {director.Bio}
            </Card.Text>
            <Link to={`/`}>
              <Button variant="link">Back to Movies</Button>
            </Link>
          </Card.Body>
        </Card>
      </div >
    );
  }
}


DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired
  }).isRequired
};
