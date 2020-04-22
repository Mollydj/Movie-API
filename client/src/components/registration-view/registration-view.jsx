import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import axios from 'axios';

import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault(); //prevents the default refresh of the page from your handlesubmit calling
    axios.post('https://ach2.herokuapp.com/users', {
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

    <form>
      <h1 className="fancy">My Flix</h1><br />
      <label>
        Username:
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label><br />
      <button type="button" onClick={handleRegister} className="d-flex justify-content-center">Submit</button>
    </form>

  );
}