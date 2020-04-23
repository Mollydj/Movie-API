import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class ProfileView extends React.Component {

  constructor() {
    super();

  }
  render() {
    const { user, movie } = this.props;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Body>
          <h2 className="fancy">{user.Username}</h2>



          <Link to={`/`}>
            <Button variant="link">Back to Movies</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}
