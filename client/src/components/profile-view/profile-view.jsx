import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";

//export means it can be imported from another place
export class ProfileView extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { user } = this.props;

    if (!user) return null;

    return (
      <div className="profile-view">

        <Card style={{ width: '34rem' }}>
          <Card.Body>
            <Card.Title><h1>{user.Username}</h1></Card.Title>
            <Card.Text>
            </Card.Text>
            <Link to={`/`}>
              <Button variant="link">Back to Movies</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>

    );
  }
}
