import React, { Component } from "react";
import "./traildetails.css";
import Context from "../Context";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";

class TrailDetails extends Component {
  static contextType = Context;

  render() {
    //Find the trail information from filtered trails
    const findTrail =
      this.context.filteredTrails.length > 0
        ? this.context.filteredTrails.find(
            (trail) => trail.id === parseInt(this.props.match.params.id)
          )
        : [];

    const trailDetails =
      findTrail.length > 0 ? (
        <div>
          <h2>{findTrail.name}</h2>
          <p>
            Rating: {findTrail.stars} - Length: {findTrail.length}
          </p>
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
      ) : (
        []
      );

    //Render the trail deteails
    return (
      <div role="main" className="main-landing">
        <Nav />
        <button
          title="Go back"
          className="go-back"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
        {trailDetails}
        <Footer />
      </div>
    );
  }
}

export default TrailDetails;
