import axios from "axios";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, Label, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //https://ach2.herokuapp.com/login


  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post("http://ach2.herokuapp.com/users/:Username", {
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
        <Form.Label>
          Username:
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Label>
        <br />
        <Form.Label>
          Password:
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Label>
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

ProfileView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
}.isRequired, {
  onClick: PropTypes.func.isRequired
}
