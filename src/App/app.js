import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./app.css";
import Landing from "../Landing/landing";
//import SignUp from "../SignUp/signUp";
//import SignIn from "../SignIn/signIn";
//import UserProfile from "../UserProfile/userProfile";

import Context from "../Context";
import config from "../config";
import ErrorBoundary from "../ErrorBoundary";

class App extends Component {
  state = {
    trails: []
  }
  render() {
    const {
      trails
    } = this.state;

    //Set value for context
    const value = {
      trails
    };

    return (
      <div className="Main">
        <header className="App-header">
          <h1>
            <Link
              to="/"
              style={{
                color: "#3CB371",
                textDecoration: "none"
              }}
            >
              Trails To Go{" "}
            </Link>{" "}
          </h1>{" "}
        </header>{" "}
        <Context.Provider value={value}>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={Landing} />{" "}


            </ErrorBoundary>{" "}
          </Switch>{" "}
        </Context.Provider>{" "}
      </div>
    );
  }
}

export default App;
