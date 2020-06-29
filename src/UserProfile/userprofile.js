import React, { Component } from "react";
import "./userprofile.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import Map from "../Map/map";
import Context from "../Context";

class UserProfile extends Component {
  static contextType = Context;

  render() {
    console.log(this.context.completed);
    const trailsCompleted = this.context.completed.length;

    const distanceWalked =
      trailsCompleted > 0
        ? this.context.completed
            .map(trail => trail.length)
            .reduce((a, c) => {
              return a + c;
            })
            .toFixed(2)
        : 0;
    const trailLengths = this.context.completed.map(trail => trail.length);
    const maxLength = trailLengths.sort((a, b) => a - b);

    const longestTrail = maxLength[maxLength.length - 1];

    return (
      <div className="profile">
        <Nav />

        <button
          title="Go back"
          className="go-back"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
        <p>Trails completed: {trailsCompleted}</p>
        <p>Distance Walked: {distanceWalked} miles</p>
        <p>Longest Trail Completed: {longestTrail} miles</p>
        <div className="map">
          <Map />
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserProfile;
