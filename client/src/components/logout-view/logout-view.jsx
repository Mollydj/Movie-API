import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { MainView } from '../main-view/main-view';

export class LogoutView extends React.Component {
  render() {
    return (
      <Card style={{ width: '16rem' }}>
        <Card.Body>
          <h2 className="fancy">Signed Out!</h2>

          <Link to={`/login`}>
            <Button variant="link" onClick={this.refreshPage}>login</Button>
          </Link>



          <Link to={`/register`}>
            <Button variant="link">register</Button>
          </Link>


        </Card.Body>
      </Card>
    )
  }
}
