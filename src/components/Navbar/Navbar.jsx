import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { RelaodPage } from '../../Constents/constents';
import AddNote from '../AddNote/AddNote';
import UserAuth from '../UserAuth/UserAuth';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const { isLoggedIn, username, logout } = useContext(AuthContext);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-lg">
              <Link className="navbar-brand" to="/">NovaX</Link> {/* Use Link for SPA navigation */}
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">recent</Link> {/* Use Link for SPA navigation */}
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/random">random</Link> {/* Use Link for SPA navigation */}
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Trending</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">leaderboard</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">date</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={RelaodPage} href="#">Reload</a>
                  </li>
                </ul>
                <span className="navbar-text d-flex flex-row-reverse align-items-center">
                  {isLoggedIn ? (
                    <>
                      <span className="navbar-username"><a href={`/profile/${username}`}>Welcome, {username}</a></span>
                      <AddNote />
                     
                      <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                    </>
                  ) : (
                    <UserAuth />
                  )}
                </span>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
