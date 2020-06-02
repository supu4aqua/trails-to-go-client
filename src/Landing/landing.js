import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./landing.css";
import Context from "../Context";

class Landing extends Component {
  static contextType = Context;
  render() {
    return (
      <div role="main" className="main-landing">
        <h2>Search for trails </h2>
        <div className="search-trail">
          <input
            type="text"
            className="search-trail"
            name="search-trail"
            id="search-trail"
            placeholder="Enter Zipcode"
            required
          />
        </div>

        <Link to="/all-trails">
          <button title="Search Trails" className="btn-search-trails">Search Trail</button>
        </Link>
      </div>
    );
  }
}

export default Landing;
