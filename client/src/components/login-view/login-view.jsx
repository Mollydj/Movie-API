import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the default refresh of the page from your handlesubmit calling
    axios.post('https://ach2.herokuapp.com/login', {
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
      <button type="button" onClick={handleSubmit} className="d-flex justify-content-center">Submit</button>
    </form>

  );
}