import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class LogoutView extends React.Component {
  render() {
    return (
      <Card style={{ width: '16rem' }}>
        <Card.Body>
          <h2 className="fancy">Signed Out!</h2>

          <Link to={`/`}>
            <Button variant="link">Login</Button>
          </Link>

          <Link to={`/register`}>
            <Button variant="link">SignUp</Button>
          </Link>

        </Card.Body>
      </Card>
    )
  }
}
