import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
}

export function UpdateUser(props) {
  const { user } = props;
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateBirthday] = useState('');



  const updateUser = (e) => {
    e.preventDefault();
    axios.put(`https://ach2.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })

      .then(response => {
        const data = response.data;
        localStorage.setItem('user', data.Username);
        window.open(`client/users/${localStorage.getItem('user')}`, '_self');
        console.log('user updated')
        alert('Your profile was updated successfully')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (

    <div className="register-view ">
      <Container className="bg-light d-flex flex-row align justify-content-center">
        <Row>
          <Col>
            <form>
              <h1 className="fancy">Update Profile</h1><br />
              <label>
                Username:
        <input type="text" value={username} placeholder='Username' onChange={e => updateUsername(e.target.value)} />
              </label><br />
              <label>
                Password:
        <input type="password" value={password} placeholder="Password" onChange={e => updatePassword(e.target.value)} />
              </label><br />
              <label>
                Email:
        <input type="Email" value={email} placeholder="Email" onChange={e => updateEmail(e.target.value)} />
              </label><br />
              <label>
                Birthday:
        <input value={birthday} placeholder="MM/DD/YYYY" onChange={e => updateBirthday(e.target.value)} />
              </label><br />
              <Button className="d-flex flex-row align justify-content-center" type="button" onClick={updateUser}>Submit</Button>
            </form>
          </Col></Row>
      </Container>
    </div>

  );
}

export default connect(mapStateToProps)(UpdateUser);