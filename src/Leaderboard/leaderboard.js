import React, { Component } from "react";
import "./leaderboard.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import Context from "../Context";
import config from "../config";

class Leaderboard extends Component {
  static contextType = Context;

  state = {
    leaderboards: [],
  };

  //Get leaderboard data when component mounts and update the local state
  componentDidMount() {
    const url = config.API_ENDPOINT + `/leaderboards`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          leaderboards: data,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  render() {
    //Longest trail completed by each user
    const longestTrails = this.state.leaderboards.longestTrails
      ? this.state.leaderboards.longestTrails.map((user) => (
          <li key={user.name} className="length-by-user">
            <p>
              <strong>{user.name}</strong> - {user.length} miles
            </p>
          </li>
        ))
      : [];

    //Total distance walked by each user
    const totalLengthByUser = this.state.leaderboards.lengthByUser
      ? this.state.leaderboards.lengthByUser.map((user) => (
          <li key={user.user_name} className="length-by-user">
            <p>
              <strong>{user.user_name}</strong> - {user.length} miles
            </p>
          </li>
        ))
      : [];

    //Get the number of trails walked by each user
    const mostTrailsByUser = this.state.leaderboards.mostTrailsByUser
      ? this.state.leaderboards.mostTrailsByUser.map((user) => (
          <li key={user.user_name} className="length-by-user">
            <p>
              <strong>{user.user_name}</strong> - {user.completed} trails
            </p>
          </li>
        ))
      : [];

    //Display results
    return (
      <div className="Leaderboard">
        <Nav />
        <main>
          <div>
            <button
              title="Go back"
              className="go-back"
              onClick={() => this.props.history.push("/all-trails")}
            >
              Back
            </button>
            <h2> Leaderboard </h2>{" "}
          </div>
          {/*Longest trail completed by each user - sorted by trail length */}
          <section id="longest-by-user">
            {longestTrails.length > 0 && (
              <p className="leaderboard-title">
                Longest trails completed by users
              </p>
            )}
            <ul id="longest-by-user-list">{longestTrails}</ul>
          </section>
          {/*Total distance walked by each user - sorted by trail length */}
          <section id="length-by-user">
            {totalLengthByUser.length > 0 && (
              <p className="leaderboard-title">
                Top hikers based on distance walked
              </p>
            )}
            <ul id="length-by-user-list">{totalLengthByUser}</ul>
          </section>
          {/*Number of trails completed by each user - sort by count */}
          <section id="count-by-user">
            {mostTrailsByUser.length > 0 && (
              <p className="leaderboard-title">
                Top hikers based on trails completed
              </p>
            )}
            <ul id="count-by-user-list">{mostTrailsByUser}</ul>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Leaderboard;
