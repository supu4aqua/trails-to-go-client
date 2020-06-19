import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./app.css";
import Landing from "../Landing/landing";
import SignUp from "../SignUp/signup";
import SignIn from "../SignIn/signin";
import AllTrails from "../AllTrails/alltrails";
import TrailDetails from "../TrailDetails/traildetails";
import UserProfile from "../UserProfile/userprofile";
//import TokenService from '../services/token-service';
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
    setError: message => {
      this.setState({ error: message });
    },
    sortBy: key => {
      let filteredTrails = this.state.trails.sort((a, b) => b[key] - a[key]);
      this.setState({ filteredTrails });
    },
    /*clearResults: () => {
      this.setState({
        trails: [],
        filteredTrails: [],
        location: "",
        error: ""
      });
    },*/
    setCompleted: id => {
      this.state.completed.find(trail_id => trail_id === id)
        ? window.alert("Trail has already been marked as completed")
        : this.setState({
            completed: [...this.state.completed, id]
          });
    }
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
            </ErrorBoundary>{" "}
            <Route render={() => <h2>Page Not Found</h2>} />
          </Switch>{" "}
        </Context.Provider>{" "}
      </div>
    );
  }
}

export default App;
