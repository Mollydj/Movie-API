import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, Label, Button, Form } from "react-bootstrap";

export function NewUser(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  function handleSubmit() {
    //e.preventDefault();
    axios.post('http://ach2.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  }

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
        <Form.Label>
          Email:
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Label>
        <br />
        <Form.Label>
          Birthday:
          <Form.Control
            type="birthday"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
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

NewUser.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.string
}.isRequired, {
  onClick: PropTypes.func.isRequired
}
