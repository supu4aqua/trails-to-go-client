import React, { Component } from "react";
import "./userprofile.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import Context from "../Context";

class UserProfile extends Component {
  static contextType = Context;

  render() {
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
        <p>Trails completed: {this.context.completed.length}</p>

        <Footer />
      </div>
    );
  }
}

export default UserProfile;
