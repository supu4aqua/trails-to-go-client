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
        <h2> Looking for a hiking trail around you ? </h2>{" "}
        <Link to="/all-trails"> Search Trails </Link> <Footer />
      </div>
    );
  }
}

export default Landing;
