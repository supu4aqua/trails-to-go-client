import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./app.css";
import Landing from "../Landing/landing";
import SignUp from "../SignUp/signup";
import SignIn from "../SignIn/signin";
import AllTrails from "../AllTrails/alltrails";
//import UserProfile from "../UserProfile/userProfile";

import Context from "../Context";
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

        <Context.Provider value={value}>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={Landing} />{" "}
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/all-trails" component={AllTrails} />
            </ErrorBoundary>{" "}
          </Switch>{" "}
        </Context.Provider>{" "}
      </div>
    );
  }
}

export default App;
