// Add form for updating
import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
        [e.target.name]: e.target.value
  })
};
  // Setup isLoading state in my Login component, and show a spinner on my form or in my button while the login request is happening.
  const handleSubmit = (e) => {
    e.preventDefault();
    // make a POST request to the server
    // the server will "authenticate" the user based on their credentials that they provide in the form
    // if they can be authenticated, the server will return a token
    // we will have to manage that token here in the application - Redux store, global management, session
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        this.props.history.push('/friends');
      })
      .catch(err => {
        console.log('invalid login: ', err);
      });
  };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
  );
}

export default Login;