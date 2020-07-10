import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./app.css";
import Landing from "../Landing/landing";
import Registration from "../Registration/registration";
import Login from "../Login/login";
import AllTrails from "../AllTrails/alltrails";
import TrailDetails from "../TrailDetails/traildetails";
import UserProfile from "../UserProfile/userprofile";
import config from "../config";
import TokenService from "../services/token-service";
import AuthApiService from "../services/auth-api-service";
import IdleService from "../services/idle-service";
import Leaderboard from "../Leaderboard/leaderboard";
import Context from "../Context";
import ErrorBoundary from "../ErrorBoundary";

class App extends Component {
  state = {
    trails: [],
    filteredTrails: [],
    error: "",
    location: "",
    users: [],
    completed: [],
    hasError: false,
    setTrails: (trails, location) => {
      this.setState({ trails, filteredTrails: trails, location });
    },
    setError: (message) => {
      this.setState({ error: message });
    },
    //Sort filtered trails
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
    //Update completed trails in state
    setCompleted: (completedTrail) => {
      this.setState({
        completed: [...this.state.completed, completedTrail],
      });
    },
    //Get all completed trails and set state
    getCompleted: () => {
      const url = config.API_ENDPOINT + `/completed`;
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong, please try again later");
          }
          return res.json();
        })
        .then((data) => {
          this.setState({
            completed: data,
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
          });
        });
    },
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  //To fetch data from server - {stateData} will be 'users'
  fetchData(stateData) {
    const url = config.API_ENDPOINT + `/${stateData}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          [stateData]: data,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  }

  componentDidMount() {
    /*
        set the function (callback) to call when a user goes idle
        we'll set this to logout a user when they're idle
      */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
          tell the idle service to register event listeners
          the event listeners are fired when a user does something, e.g. move their mouse
          if the user doesn't trigger one of these event listeners,
            the idleCallback (logout) will be invoked
        */
      IdleService.regiserIdleTimerResets();

      /*
          Tell the token service to read the JWT, looking at the exp value
          and queue a timeout just before the token expires
        */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }

    //Fetch user data
    this.fetchData("users");
  }

  componentWillUnmount() {
    /*
        when the app unmounts,
        stop the event listeners that auto logout (clear the token from storage)
      */
    IdleService.unRegisterIdleResets();
    /*
        and remove the refresh endpoint request
      */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
        react won't know the token has been removed from local storage,
        so we need to tell React to rerender
      */
    this.forceUpdate();
  };

  render() {
    return (
      <div className="Main">
        <Context.Provider value={this.state}>
          {this.state.hasError && (
            <p className="red">There was an error! Oh no!</p>
          )}
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={Landing} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/login" component={Login} />
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
