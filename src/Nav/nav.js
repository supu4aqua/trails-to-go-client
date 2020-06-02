import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
//import Context from "../Context";

class Nav extends Component {
  //static contextType = Context;
  render() {
    return (
      <div role="main" className="Nav">
      <div className="Login">
      <Link to="/signup">
        <button title="Sign Up" className="btn-signup">Sign Up</button>
      </Link>
      <Link to="/signin">
        <button title="Sign In" className="btn-signin">Sign In</button>
      </Link>
      </div>
        <header className="App-header">
          <h1>
            <Link
              to="/"
              style={{
                color: "#3CB371",
                textDecoration: "none"
              }}
            >
              Trails To Go
            </Link>
          </h1>
        </header>


      </div>
    );
  }
}

export default Nav;
