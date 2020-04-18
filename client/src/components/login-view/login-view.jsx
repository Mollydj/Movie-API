import axios from "axios";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, Label, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //https://ach2.herokuapp.com/login


  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post("http://ach2.herokuapp.com/login", {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <div className="main-view">
      <header className="big-blue-text">MyFlix</header>
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
        <br />

        <button type="button" className="btn btn-blue" onClick={handleSubmit}>
          Submit
        </button>

        <br /><br />

        <Link to={`/register`}>
          <Button type="button" className="btn btn-blue" variant="link">Sign Up!</Button>
        </Link>

      </Form>
    </div>
  );
}

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  setUsername: PropTypes.string,
  setPassword: PropTypes.string
}.isRequired, {
  onClick: PropTypes.func.isRequired
}
