import React, { Component } from "react";
import "./traildetails.css";
import Context from "../Context";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";

import { Redirect } from "react-router-dom";

class TrailDetails extends Component {
  static contextType = Context;

  render() {
    //Find the trail information from filtered trails
    const findTrail =
      this.context.filteredTrails && this.context.filteredTrails.length > 0
        ? this.context.filteredTrails.find(
            (trail) => trail.id === parseInt(this.props.match.params.id)
          )
        : false;

    const trailDetails = findTrail ? (
      <div>
        <h2>{findTrail.name}</h2>
        <p>Rating: {findTrail.stars}</p>
        <p>Length: {findTrail.length} miles</p>
        <p>Location: {findTrail.location}</p>
        <p>{findTrail.summary}</p>
        {findTrail.imgSmallMed !== "" && (
          <img
            src={findTrail.imgSmallMed}
            alt="Preview"
            className="img-trail"
          />
        )}
      </div>
    ) : this.props.test ? (
      ""
    ) : (
      <Redirect to="/all-trails" />
    );

    //Render the trail deteails
    return (
      <div className="details">
        <Nav />
        <div role="main" className="trail-details">
          <button
            title="Go back"
            className="go-back"
            onClick={() => this.props.history.goBack()}
          >
            Back
          </button>
          {trailDetails}
        </div>
        <Footer />
      </div>
    );
  }
}

export default TrailDetails;
