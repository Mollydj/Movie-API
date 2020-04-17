import axios from "axios";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, Label, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LogoutView(props) {



  return (
    <div className="main-view">
      <h1><i>Youve been logged out!</i></h1>
      <Link to={`/register`}>
        <Button type="button" className="btn btn-blue px-10" expand="lg" variant="link">Sign Up</Button>
      </Link>
      <Link to={`/`}>
        <Button type="button" className="btn btn-blue px-10" expand="lg" variant="link">Login</Button>
      </Link>

    </div>
  );
}

