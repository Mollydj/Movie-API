import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the default refresh of the page from your handlesubmit calling
    axios.post('http://ach2.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);//data contains token + username
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <Container className="bg-light d-flex flex-row align justify-content-center">
      <Row>
        <Col>
          <h1 className="fancy">Log in</h1><br />
          <form>

            <label>
              Username:
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label><br />
            <label>
              Password:
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
          </form>

          <div className="d-flex justify-content-center">
            <Button type="Button" onClick={handleSubmit}>Submit</Button>
            <Link to={`/register`}>
              <Button variant="link">Sign Up</Button>
            </Link>
          </div>
        </Col></Row>
    </Container >
  );
}