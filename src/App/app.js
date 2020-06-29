import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./app.css";
import Landing from "../Landing/landing";
import SignUp from "../SignUp/signup";
import SignIn from "../SignIn/signin";
import AllTrails from "../AllTrails/alltrails";
import TrailDetails from "../TrailDetails/traildetails";
import UserProfile from "../UserProfile/userprofile";
import Leaderboard from "../Leaderboard/leaderboard";
import Context from "../Context";
import ErrorBoundary from "../ErrorBoundary";

class App extends Component {
  state = {
    trails: [],
    filteredTrails: [],
    error: "",
    location: "",
    completed: [],
    setTrails: (trails, location) => {
      this.setState({ trails, filteredTrails: trails, location });
    },
    setError: (message) => {
      this.setState({ error: message });
    },
    sortBy: (key) => {
      let filteredTrails = this.state.trails.sort((a, b) => b[key] - a[key]);
      this.setState({ filteredTrails });
    },
    clearResults: () => {
      this.setState({
        trails: [],
        completed: [],
        filteredTrails: [],
        location: "",
        error: "",
      });
    },
    setCompleted: (id) => {
      let findTrail = this.state.filteredTrails.find(
        (trail) => trail.id === id
      );
      let completedTrail = (({ id, name, length, starVotes, stars }) => ({
        id,
        name,
        length,
        starVotes,
        stars,
      }))(findTrail);
      this.state.completed.find((trail) => trail.id === id)
        ? window.alert("Trail has already been marked as completed")
        : this.setState({
            completed: [...this.state.completed, completedTrail],
          });
    },
  };

  render() {
    return (
      <div className="Main">
        <Context.Provider value={this.state}>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={Landing} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/all-trails" component={AllTrails} />
              <Route exact path="/trails/:id" component={TrailDetails} />
              <Route exact path="/userprofile" component={UserProfile} />
              <Route exact path="/leaderboard" component={Leaderboard} />
            </ErrorBoundary>{" "}
            <Route render={() => <h2>Page Not Found</h2>} />
          </Switch>{" "}
        </Context.Provider>{" "}
      </div>
    );
  }
}

export default App;
