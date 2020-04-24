import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const updateUser = (e) => {
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
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  }

  return (
    <div className="register-view">
      <form>
        <h1 className="fancy">My Flix</h1><br />
        <label>
          Username:
        <input type="text" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
        <input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </label><br />
        <label>
          Email:
        <input type="Email" value={email} placeholder="JohnSmith@email.com" onChange={e => setEmail(e.target.value)} />
        </label><br />
        <label>
          Birthday:
        <input value={birthday} placeholder="MM/DD/YYYY" onChange={e => setBirthday(e.target.value)} />
        </label><br />
        <Button type="button" onClick={updateUser} className="d-flex justify-content-center">Submit</Button>
      </form>
    </div>
  );
}

