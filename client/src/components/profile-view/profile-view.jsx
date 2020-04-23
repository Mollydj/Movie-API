import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { MainView } from '../main-view/main-view';
export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    return (
      <Card style={{ width: '16rem' }}>
        <Card.Body>
          <h2 className="fancy">Profile</h2>

          {profile.map(user => <div>{user.Username}</div>)}
          <Link to={`/logout`}>
            <Button variant="link" onClick={this.onLoggedOut}>logout</Button>
          </Link>

          <Link to={`/`}>
            <Button variant="link">Back to Movies</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}
