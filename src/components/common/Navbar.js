import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { auth } from '../../firebase/firebase';

export default function Navbar(props) {

  async function onLogoutClicked() {
    await signOut(auth);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">iX Chat</div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {
              props.user ?
                <li className="nav-item">
                  <button
                    onClick={onLogoutClicked}
                    className='btn btn-primary'>
                    Logout
                  </button>
                </li>
                :
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}
