import React, { useState } from "react";
import { FormControl, Label, Button, Form } from "react-bootstrap";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
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
      </Form>
    </div>
  );
}
