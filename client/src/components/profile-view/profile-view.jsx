import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, Label, Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  function getUser() {
    //e.preventDefault();
    axios.get('http://ach2.herokuapp.com/users/:Username', {
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
    console.log(Username)
  }




  return (


    <div className="main-view">

      <header className="big-blue-text"><h1>Profile</h1></header>
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <h3>Username:</h3>
          <h3>Email:</h3>
          <h3>Birthday:</h3>
        </Card.Body>
      </Card>
    </div >
  );
}

ProfileView.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      Username: PropTypes.string,
      Password: PropTypes.string,
      Email: PropTypes.string,
      Birthday: PropTypes.string,

    })
  ),
}
