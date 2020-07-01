import React, { Component } from "react";
import "./leaderboard.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";

class Leaderboard extends Component {
  render() {
    return (
      <div className="Leaderboard">
        <Nav />
        <button
          title="Go back"
          className="go-back"
          onClick={() => this.props.history.goBack()}
        >
          Back
        </button>
        <h2>COMING SOON WITH SERVER INTEGRATION</h2>
        <Footer />
      </div>
    );
  }
}

export default Leaderboard;
