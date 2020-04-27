import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;
    return (
      <Container className="bg-light d-flex flex-row align justify-content-center">
        <Row>
          <Col>
            <h2 className="fancy"> {genre.Name}</h2>

            <div>{genre.Description}</div>
            <Link to={`/`}>
              <Button variant="link">Back to Movies</Button>
            </Link>
          </Col></Row>
      </Container>
    )
  }
}
export default connect(({ movies }) => ({ movies }))(GenreView);