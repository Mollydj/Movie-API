import React from 'react';
import { PropTypes } from 'prop-types';
import { MainView } from "../main-view/main-view";


export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null

    };
  }

  render() {
    return (
      <div>
        <p>Name: {this.props.username}</p>
      </div>
    );
  }
}

user.propTypes = {
  username: PropTypes.string,
};

export default ProfileView;