import React, { Component } from "react";
import "./userprofile.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import Context from "../Context";

class UserProfile extends Component {
  static contextType = Context;

  render() {
    const trailsCompleted = this.context.completed.length;

    const distanceWalked =
      trailsCompleted > 0
        ? this.context.completed
            .map((trail) => trail.length)
            .reduce((a, c) => {
              return a + c;
            })
            .toFixed(2)
        : 0;
    const trailLengths = this.context.completed.map((trail) => trail.length);
    const maxLength = trailLengths.sort((a, b) => a - b);

    const isLongestTrail = maxLength[maxLength.length - 1];

    const longestTrail = isLongestTrail > 0 ? isLongestTrail : 0;

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

        <Footer />
      </div>
    );
  }
}

export default UserProfile;
