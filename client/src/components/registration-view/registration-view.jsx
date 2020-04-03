import React, { useState } from "react";

export function NewUser(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  function handleSubmit() {
    //e.preventDefault();
    console.log(username, password, email, birthday);
    props.onNewUser(username);
  }

  return (
    <div className="main-view">
      <header className="big-blue-text">MyFlix</header>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Birthday:
          <input
            type="birthday"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          />
        </label>
        <br />
        <button type="button" className="btn btn-blue" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
