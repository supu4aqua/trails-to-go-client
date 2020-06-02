import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import Context from "../Context";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";

class Landing extends Component {
  static contextType = Context;
  render() {
    return (
      <div role="main" className="main-landing">
      <Nav />
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
        <Footer />
      </div>
    );
  }
}

export default Landing;
