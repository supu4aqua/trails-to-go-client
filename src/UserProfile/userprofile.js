import React, { Component } from "react";
import "./userprofile.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import Context from "../Context";

class UserProfile extends Component {
  static contextType = Context;

  //Get all completed trails when component mounts
  componentDidMount() {
    this.context.getCompleted();
  }

  render() {
    let numTrailsCompleted = 0;
    let distanceWalked = 0;
    let longestTrail = 0;
    let trails = [];

    const completedTrails = this.context.completed;

    if (completedTrails.length) {
      //Find number of trails completed by user
      numTrailsCompleted = completedTrails.length;

      //Length of longest trail completed
      var maxTrailLength = completedTrails.reduce(function (prev, current) {
        return prev.length > current.length ? prev : current;
      });
      longestTrail = maxTrailLength.length;

      //Total distance walked combining length of all completed trails
      for (var i = 0; i < completedTrails.length; i++) {
        distanceWalked = distanceWalked + parseFloat(completedTrails[i].length);
      }

      //Find all the completed trails
      trails = this.context.completed
        .sort((a, b) => b.completed_on - a.completed_on)
        .map((trail) => (
          <li key={trail.trail_id} className="trails-list">
            {trail.name} - {trail.length} miles
          </li>
        ));
    }

    return (
      <div className="profile">
        <Nav />
        <button
          title="Go back"
          className="go-back"
          onClick={() => this.props.history.push("/all-trails")}
        >
          Back
        </button>
        <h3> User Profile </h3>{" "}
        <p>
          <strong>Trails completed:</strong> {numTrailsCompleted}
        </p>
        <p>
          <strong>Distance Walked:</strong> {distanceWalked.toFixed(2)} miles
        </p>
        <p>
          <strong>Longest Trail Completed:</strong> {longestTrail} miles
        </p>
        {trails.length > 0 && (
          <p className="completed-trails">Completed Trails</p>
        )}
        <div className="trailList">
          <ul>{trails}</ul>
        </div>
        <Footer />
      </div>
    );
  }
}

export default UserProfile;
