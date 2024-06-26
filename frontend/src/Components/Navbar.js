import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from 'react-router-dom';
// import Userhomepage from '../Components/Userhomepage';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <h3>CodePrep</h3>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        {/* <li className="nav-item active">
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li> */}
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/Contact">Contact Us</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Sign-up">Registration</NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/test">Exammodule</NavLink>
        </li> */}
      </ul>
    </div>
  </nav>
  )
}

export default Navbar