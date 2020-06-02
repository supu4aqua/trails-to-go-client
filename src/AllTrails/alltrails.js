import React, { Component } from "react";
import "./alltrails.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";

class AllTrails extends Component {
  render() {
    return (
      <div className="all-trails">
        <Nav />
        <h1>Search Results</h1>
        <Footer />
      </div>
    );
  }
}

export default AllTrails;
