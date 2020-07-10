import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

import TokenService from "../services/token-service";
import IdleService from "../services/idle-service";
import Context from "../Context";

class Nav extends Component {
  static contextType = Context;
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout{" "}
        </Link>{" "}
        <span className="Hyph"> {" - "} </span>{" "}
        <Link to="/userprofile"> Profile </Link>{" "}
        <span className="Hyph"> {" - "} </span>{" "}
        <Link to={`/leaderboard`}> Leaderboard </Link>{" "}
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/registration"> Register </Link>{" "}
        <span className="Hyph"> {" - "} </span>{" "}
        <Link to="/login"> Log in </Link>{" "}
        <span className="Hyph"> {" - "} </span>{" "}
        <Link to={`/leaderboard`}> Leaderboard </Link>{" "}
      </div>
    );
  }
  render() {
    return (
      <nav role="main" className="Nav">
        <h1>
          <Link to="/">Trails To Go </Link>{" "}
        </h1>{" "}
        <div className="Login">
          {" "}
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}{" "}
        </div>{" "}
      </nav>
    );
  }
}

export default Nav;
