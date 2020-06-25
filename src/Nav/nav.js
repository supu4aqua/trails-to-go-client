import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'


class Nav extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
  }

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
        <span className="Hyph">{" - "}</span>
        <Link to={`/userprofile`}>Profile</Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/signup">Register</Link>
        <span className="Hyph">{" - "}</span>
        <Link to="/signin">Log in</Link>
      </div>
    );
  }
  render() {
    return (
      <nav role="main" className="Nav">
        <div className="Login">
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
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
      </nav>
    );
  }
}

export default Nav;
