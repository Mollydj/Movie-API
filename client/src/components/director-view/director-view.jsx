import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    const { director } = this.props;
    if (!director) return null;

    return (
      <Container className="bg-light d-flex flex-row align justify-content-center">
        <Row>
          <Col>
            <h2 className="fancy"> {director.Name}</h2>
            <h3 className="fancy">{director.Birth}-{director.Death}</h3>
            <div>{director.Bio}</div>
            <Link to={`/`}>
              <Button variant="link">Back to Movies</Button>
            </Link>
          </Col></Row>
      </Container>
    )
  }
}

export default connect(({ movies }) => ({ movies }))(DirectorView);
