import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./app.css";
import Landing from "../Landing/landing";
import SignUp from "../SignUp/signup";
import SignIn from "../SignIn/signin";
import AllTrails from "../AllTrails/alltrails";
import TrailDetails from "../TrailDetails/traildetails";
import UserProfile from "../UserProfile/userprofile";
import TokenService from '../services/token-service'
import AuthApiService from '../services/auth-api-service'
import IdleService from '../services/idle-service'
import Context from "../Context";
import ErrorBoundary from "../ErrorBoundary";

class App extends Component {
  state = {
    trails: [],
    filteredTrails: [],
    error: "",
    location: "",
    completed: [],
    hasError: false,
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

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
      /*
        set the function (callback) to call when a user goes idle
        we'll set this to logout a user when they're idle
      */
      IdleService.setIdleCallback(this.logoutFromIdle)

      /* if a user is logged in */
      if (TokenService.hasAuthToken()) {
        /*
          tell the idle service to register event listeners
          the event listeners are fired when a user does something, e.g. move their mouse
          if the user doesn't trigger one of these event listeners,
            the idleCallback (logout) will be invoked
        */
        IdleService.regiserIdleTimerResets()

        /*
          Tell the token service to read the JWT, looking at the exp value
          and queue a timeout just before the token expires
        */
        TokenService.queueCallbackBeforeExpiry(() => {
          /* the timoue will call this callback just before the token expires */
          AuthApiService.postRefreshToken()
        })
      }
    }

    componentWillUnmount() {
      /*
        when the app unmounts,
        stop the event listeners that auto logout (clear the token from storage)
      */
      IdleService.unRegisterIdleResets()
      /*
        and remove the refresh endpoint request
      */
      TokenService.clearCallbackBeforeExpiry()
    }

    logoutFromIdle = () => {
      /* remove the token from localStorage */
      TokenService.clearAuthToken()
      /* remove any queued calls to the refresh endpoint */
      TokenService.clearCallbackBeforeExpiry()
      /* remove the timeouts that auto logout when idle */
      IdleService.unRegisterIdleResets()
      /*
        react won't know the token has been removed from local storage,
        so we need to tell React to rerender
      */
      this.forceUpdate()
    }

  render() {
    return (
      <div className="Main">
        <Context.Provider value={this.state}>
        {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
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
