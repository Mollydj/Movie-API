import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { director, movie } = this.props;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Body>
          <h2 className="fancy"> {director.Name}</h2>
          <h3 className="fancy">{director.Birth}-{director.Death}</h3>
          <div>{director.Bio}</div>
          <Link to={`/`}>
            <Button variant="link">Back to Movies</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}
