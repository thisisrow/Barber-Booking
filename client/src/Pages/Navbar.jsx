import React from "react";
import logo from "../assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav class="navbar bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          HairStyle
        </a>
        <form class="d-flex">
          <Link to="/login" className="btn btn-outline-primary" type="button">
            Admin
          </Link>
          <div id="google_translate_element" className="btn btn-outline-primary"></div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
