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
        <div className="intro">
          <h3>Looking to discover new hiking trails?</h3>
          <p>Search trails and mark them as completed</p>
        </div>
        <section className="landingBox">
          <div className="landingBox-content">
            <h2>Hike.Track.Rank.</h2>{" "}
            <Link to="/all-trails"> Search Trails </Link>{" "}
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Landing;
