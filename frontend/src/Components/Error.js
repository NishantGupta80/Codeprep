import React from "react";
import {NavLink} from 'react-router-dom'

const Error = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>We Are Sorry,Page Not Found!</h2>
          <p className="mb-5">
            The Page You are Looking For miht have been removed OR Had it's Name Changed or TEMPORARILY UNAVAILABLE!
          </p>
          <NavLink to='/'>Go back to Home Page</NavLink>
        </div>
      </div>
    </>
  );
};

export default Error;
