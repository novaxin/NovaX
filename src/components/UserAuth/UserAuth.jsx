import React, { useState, useContext } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import './UserAuth.css'; // You can define custom styles in this file
import { Base_url, RelaodPage } from '../../Constents/constents';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function UserAuth() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const { login, isLoggedIn, logout } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors('');

    if (isNewUser) {
      // Registration
      if (password !== confirmPassword) {
        setErrors('Passwords do not match');
        return;
      }

      axios.post(`${Base_url}/register`, { username, password })
        .then(response => {
          console.log('User registered successfully:', response.data);
          login(response.data.token, username); // Assuming response contains a token
          RelaodPage();
        })
        .catch(error => {
          console.error('Error registering user:', error.response ? error.response.data : error.message);
          setErrors(error.response.data.error);
        });
    } else {
      // Login
      axios.post(`${Base_url}/login`, { username, password })
        .then(response => {
          console.log('User authenticated successfully:', response.data);
          login(response.data.token, username); // Assuming response contains a token
          RelaodPage();
        })
        .catch(error => {
          console.error('Error authenticating user:', error.response ? error.response.data : error.message);
          setErrors('Invalid credentials');
        });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <FaRegCircleUser className='authicon' placeholder='post note' data-toggle="modal" data-target="#userauthmodel" />
          </div>
        </div>
      </div>

      <div className="modal fade" id="userauthmodel" tabIndex="-1" aria-labelledby="userauthmodelLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userauthmodelLabel">{isNewUser ? 'User Registration' : 'User Login'}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {errors && (<div className="alert alert-danger">{errors}</div>)}
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {isNewUser && (
                  <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">{isNewUser ? 'Register' : 'Login'}</button>
              </div>
              <div className="container-fluid">
                <div className="row mt-2">
                  <div className="col text-center">
                    <button type="button" className="btn btn-link" onClick={() => setIsNewUser(!isNewUser)}>
                      {isNewUser ? 'Already have an account? Login' : 'New user? Register'}
                    </button>
                  </div>
                </div>
                {isLoggedIn && (
                  <div className="row mt-2">
                    <div className="col text-center">
                      <button type="button" className="btn btn-danger" onClick={logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAuth;
