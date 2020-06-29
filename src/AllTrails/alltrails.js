import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./alltrails.css";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";

import Context from "../Context";
import config from "../config";
import TokenService from "../services/token-service";
import { NavLink } from "react-router-dom";

class AllTrails extends Component {
  static contextType = Context;

  handleSubmit = e => {
    e.preventDefault();
    //  this.context.clearResults();
    //Get zipcode and find find coordinates using google maps api
    const { zipcode } = e.target;
    const locationParams = {
      address: zipcode.value,
      key: config.GEOCODE_API_KEY
    };

    //Create the parameters query for API call URL
    const queryItems = Object.keys(locationParams).map(
      key =>
        `${encodeURIComponent(key)}=${encodeURIComponent(locationParams[key])}`
    );
    const queryString = queryItems.join("&");
    const urlCoord = config.GEOCODE_URL + "?" + queryString;

    fetch(urlCoord)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        if (responseJson.results.length) {
          const coords = responseJson.results[0].geometry.location;

          this.searchTrails(coords, responseJson.results[0].formatted_address);
        } else {
          this.context.setError("Invalid Zip/Postal Code");
        }
      })

      .catch(err => {
        this.context.setError("Invalid Zip/Postal Code");
      });
  };

  //Search trails
  searchTrails(coords, location) {
    const params = {
      lat: coords.lat,
      lon: coords.lng,
      maxResults: 30,
      key: config.TRAIL_API_KEY
    };
    const queryParams = Object.keys(params).map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    );
    const trailString = queryParams.join("&");
    const url = config.TRAIL_URL + "?" + trailString;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then(data => {
        if (data.trails.length > 0) {
          this.context.setTrails(data.trails, location);
        } else {
          this.context.setError("No Matches Found");
        }
      })
      .catch(err => {
        this.context.setError("No Matches Found");
      });
  }

  /*componentWillUnmount(){
    this.context.clearResults();
  }*/

  handleCompleted = id => {
    TokenService.hasAuthToken()
      ? this.context.setCompleted(id)
      : this.props.history.push("/signin");
  };

  render() {
    const trails =
      this.context.filteredTrails.length > 0 &&
      this.context.filteredTrails.map(
        trail =>
        !this.context.completed.find(trails => trails.id === trail.id) &&
          (
            <li key={trail.id} className="trails">
              <div>
                <NavLink to={`/trails/${trail.id}`}>{trail.name}</NavLink>
                <button
                  className="completed"
                  onClick={() => {
                    if (window.confirm("Did you complete this trail?"))
                      this.handleCompleted(trail.id);
                  }}
                >
                  Mark Completed
                </button>
                <p>
                  Rating: {trail.stars} - Length: {trail.length}
                </p>
                <p>Location: {trail.location}</p>
              </div>
            </li>
          )
      );

    const completedTrails =
      this.context.filteredTrails.length > 0 &&
      this.context.completed.length > 0 &&
      this.context.filteredTrails.map(
        trail =>
    this.context.completed.find(trails => trails.id === trail.id) &&
          (
            <li key={trail.id} className="trails">
              <div>
                <NavLink to={`/trails/${trail.id}`}>{trail.name}</NavLink>
                <p>
                  Rating: {trail.stars} - Length: {trail.length}
                </p>
                <p>Location: {trail.location}</p>
              </div>
            </li>
          )
      );

    const trailFilters =
      this.context.filteredTrails.length > 0 ? (
        <section>
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            name="sort"
            onChange={e => this.context.sortBy(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="stars">Rating</option>
            <option value="length">Trail Length</option>
          </select>
        </section>
      ) : (
        []
      );

    return (
      <div className="all-trails">
        <Nav />
        <form id="js-form" onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            className="search-trail"
            name="zipcode"
            id="zipcode"
            placeholder="Enter Zipcode"
            required
          />

          <button
            type="submit"
            title="Search Trails"
            className="btn-search-trails"
          >
            Search Trail
          </button>
        </form>
        {this.context.location !== "" && (
          <h3>Results for: {this.context.location}</h3>
        )}
        <div className="trail-filters">{trailFilters}</div>
        <section id="results">
          <ul id="results-list">{trails}</ul>
        </section>
        <section id="completed-results">
          {completedTrails.length > 0 && <h2>Completed</h2>}
          <ul id="results-list-completed">{completedTrails}</ul>
        </section>
        {this.context.error !== "" && (
          <div className="error-message">{this.context.error}</div>
        )}

        <Footer />
      </div>
    );
  }
}

export default AllTrails;
