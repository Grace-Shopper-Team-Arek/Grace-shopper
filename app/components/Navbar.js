import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const token = window.localStorage.token;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeclassname="active" className="nav-link" to="/Cart">
              Cart
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeclassname="active"
              className="nav-link"
              to="/Products"
            >
              Products
            </NavLink>
          </li>
          { (token && token !== "guest") ? <li className="nav-item">
            <NavLink
              activeclassname="active"
              className="nav-link"
              to="/users/:id"
            >
              Profile
            </NavLink>
          </li> : ""}
    {(token && token !== "guest") ? <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/orders/past">Orders</NavLink>
                    </li> : "" }
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
