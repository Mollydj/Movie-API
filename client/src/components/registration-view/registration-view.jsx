
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './registration-view.scss';
import { FormControl, Label } from "react-bootstrap";

export function NewUser(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post('https://ach2.herokuapp.com/users',
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        alert('Registration successful! Click OK to log in.')
        window.open('/', '_self');
      })
      .catch(error => {
        console.log('error registering the user' + error);
      });
  };

  return (
    <div className="registration-view">

      <header className="big-blue-text">Sign Up</header>
      <Form>

        <Form.Group controlid="formBasicUsername">
          <Form.Label> Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required />
        </Form.Group>


        <Form.Group controlid="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required />
        </Form.Group>

        <Form.Group controlid="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required />
        </Form.Group>

        <Form.Group controlid="formBasicBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
            required
          />
        </Form.Group>


        <button className="btn btn-blue" type="submit" onClick={handleSignUp}>
          Submit
        </button>
      </Form>
    </div>
  );
}
