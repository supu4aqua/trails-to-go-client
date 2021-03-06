import React, { Component } from "react";
import "./alltrails.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import Context from "../Context";
import config from "../config";
import TokenService from "../services/token-service";
import { NavLink } from "react-router-dom";
import ImageNotFound from "./ImageNotFound.png";
import Rating from "react-rating";

class AllTrails extends Component {
  static contextType = Context;

  //Fetch all the trails completed by the user if the user is already logged in
  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      this.context.getCompleted();
    }
  }

  //Search trails by finding the geo location of zipcode entered
  handleSubmit = (e) => {
    e.preventDefault();
    this.context.clearResults();
    if (TokenService.hasAuthToken()) {
      this.context.getCompleted();
    }
    //Get zipcode and find the coordinates using google maps api
    const { zipcode } = e.target;
    const locationParams = {
      address: zipcode.value,
      key: config.GEOCODE_API_KEY,
    };

    //Create the parameters query for API call URL
    const queryItems = Object.keys(locationParams).map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(locationParams[key])}`
    );
    const queryString = queryItems.join("&");
    const urlCoord = config.GEOCODE_URL + "?" + queryString;

    fetch(urlCoord)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((responseJson) => {
        if (responseJson.results.length) {
          const coords = responseJson.results[0].geometry.location;

          this.searchTrails(coords, responseJson.results[0].formatted_address);
        } else {
          this.context.setError("Invalid Zip/Postal Code");
        }
      })

      .catch((err) => {
        this.context.setError("Invalid Zip/Postal Code");
      });
  };

  //Search trails - Result is limited to max 30 trails for each search
  searchTrails(coords, location) {
    const params = {
      lat: coords.lat,
      lon: coords.lng,
      maxResults: 30,
      key: config.TRAIL_API_KEY,
    };
    const queryParams = Object.keys(params).map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    const trailString = queryParams.join("&");
    const url = config.TRAIL_URL + "?" + trailString;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((data) => {
        if (data.trails.length > 0) {
          this.context.setTrails(data.trails, location);
        } else {
          this.context.setError("No Matches Found");
        }
      })
      .catch((err) => {
        this.context.setError("No Matches Found");
      });
  }

  //check if the auth toekn exists or not before marking any trail as completed
  handleCompleted = (trail_id) => {
    TokenService.hasAuthToken()
      ? this.postCompleted(trail_id)
      : this.props.history.push("/login");
  };

  //Post trail as completed
  postCompleted(trail_id) {
    let findTrail = this.context.filteredTrails.find(
      (trail) => trail.id === trail_id
    );
    let completedTrail = (({ id, name, length }) => ({
      trail_id,
      name,
      length,
    }))(findTrail);

    //Update database with completed trail
    fetch(config.API_ENDPOINT + `/completed`, {
      method: "POST",
      body: JSON.stringify(completedTrail),
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json",
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then(this.context.setCompleted(completedTrail))

      .catch(this.context.setError);
  }

  //Render Search results
  render() {
    let trailsNotCompleted = [];
    let trails = [];
    let trailsCompleted = [];
    let completedTrails = [];

    if (this.context.filteredTrails && this.context.filteredTrails.length > 0) {
      //Find all trails not completed by user
      trailsNotCompleted = this.context.filteredTrails.filter(
        (filteredTrail) =>
          !this.context.completed.find(
            (completedTrail) => filteredTrail.id === completedTrail.trail_id
          )
      );

      trails =
        trailsNotCompleted.length > 0 &&
        trailsNotCompleted.map((trail) => (
          <li key={trail.id} className="trails">
            <div>
              <div
                className="trail-image"
                style={{
                  backgroundImage: `url(${trail.imgSmallMed || ImageNotFound})`,
                }}
              ></div>
              <NavLink to={`/trails/${trail.id}`}>{trail.name}</NavLink>
              <button
                className="completed"
                aria-label="completed"
                onClick={() => {
                  if (window.confirm("Did you complete this trail?"))
                    this.handleCompleted(trail.id);
                }}
              ></button>
              <Rating initialRating={trail.stars} />
              <p>Length: {trail.length} mi</p>
              <p>{trail.location}</p>
            </div>
          </li>
        ));

      //Find all trails completed by user
      trailsCompleted = this.context.filteredTrails.filter((filteredTrail) =>
        this.context.completed.find(
          (completedTrail) => filteredTrail.id === completedTrail.trail_id
        )
      );

      completedTrails =
        trailsCompleted.length > 0 &&
        trailsCompleted.map((trail) => (
          <li key={trail.id} className="trails">
            <div>
              <div
                className="trail-image"
                style={{
                  backgroundImage: `url(${trail.imgSmallMed || ImageNotFound})`,
                }}
              ></div>
              <NavLink to={`/trails/${trail.id}`}>{trail.name}</NavLink>
              <button
                className="completed"
                aria-label="completed"
                onClick={() => {
                  if (window.confirm("Did you complete this trail?"))
                    this.handleCompleted(trail.id);
                }}
              ></button>
              <Rating initialRating={trail.stars} />
              <p>Length: {trail.length} mi</p>
              <p>{trail.location}</p>
            </div>
          </li>
        ));
    }

    //Trail search filters
    const trailFilters =
      this.context.filteredTrails && this.context.filteredTrails.length > 0 ? (
        <section>
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            name="sort"
            onChange={(e) => this.context.sortBy(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="stars">Rating</option>
            <option value="length">Trail Length</option>
          </select>
        </section>
      ) : (
        []
      );

    //Display results
    return (
      <div className="all-trails">
        <Nav />
        <main>
          <h2> Search </h2>

          <form id="js-form" onSubmit={(e) => this.handleSubmit(e)}>
            <input
              type="text"
              className="search-trail"
              name="zipcode"
              id="zipcode"
              placeholder="Enter Zipcode"
              aria-label="Enter Zipcode"
              required
            />

            <button
              type="submit"
              title="Search Trails"
              className="btn-search-trails"
            >
              Search Trail
            </button>
            <ul className="b">
              <li>
                Enter a zipcode and search hiking trails in the area. Ex - 11375
              </li>
              <li>Click on the trail name for more details.</li>
              <li>
                Login and mark a trail as 'Completed' by clicking{" "}
                <img
                  src="/img/completed.jpg"
                  width="15"
                  height="15"
                  alt="completed"
                  className="steps-completed"
                />
              </li>
              <li>
                Visit the Leaderboard to see how you rank up with our hikers.
              </li>
            </ul>
          </form>
          {this.context.location !== "" && (
            <p className="location">Results for: {this.context.location}</p>
          )}
          {/*Display all trails not completed by user*/}
          <div className="trail-filters">{trailFilters}</div>
          <section className="results">
            <ul className="results-list">{trails}</ul>
          </section>
          {/*Completed trails section*/}
          <section className="results">
            {completedTrails.length > 0 && <h2>Completed</h2>}
            <ul className="results-list">{completedTrails}</ul>
          </section>
          {/*Display errors, if any */}
          {this.context.error !== "" && (
            <div className="error-message">{this.context.error}</div>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default AllTrails;
