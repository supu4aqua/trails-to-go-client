  # Trails To Go

  Where users can search for trails by zipcode and mark them as completed.
  
<a href="https://trails-to-go-client.mesupi.vercel.app/" target="_blank">Live Version</a>
  
  This repo contains the client-side React app. Looking for the back-end Trails-To-Go API? **[Click Here](https://github.com/supu4aqua/trails-to-go-server.git)**

## Introduction
Users can search for trails by zipcode and can also filter the list by trail rating or length.
Users can also register and mark a trail as completed after logging in.
User profile section shows the statistics based on the trails completed by the user.
Leaderboard shows the top hikers based on trails completed

## Screen Captures
#### Landing Page:
(![Landing Page](https://github.com/supu4aqua/trails-to-go-client/Landing.jpg?raw=true "LandingPage"))

#### Search Trail:
![Search Trail](/relative/path/to/search_trail.jpg?raw=true "SearchTrail")

#### User Profile:
![Profile](/relative/path/to/Profile.jpg?raw=true "Profile")

#### Leaderboard: 
![Leaderboard](/relative/path/to/Leaderboard.jpg?raw=true "Leaderboard")


## Technology

### Front End
* [React](https://reactjs.org/)
    * [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
    * [React Router](https://reacttraining.com/react-router/)
* HTML5
* CSS3
    * [CSS Modules](https://github.com/css-modules/css-modules)

### Testing
* [Jest](https://jestjs.io/en/)

### Production
* [Heroku](https://www.heroku.com/) Cloud Application Platform

## Install and run locally
*** NOTE: The client makes AJAX calls to the [Trails To Go API](https://github.com/supu4aqua/trails-to-go-server.git), which should also be running in your development environment

* Clone this repository:
    * `git clone https://github.com/supu4aqua/trails-to-go-client.git`
* Move into folder:
    * `cd trails-to-go-client/`
* Run `npm install`
* Run `npm start`
* In browser, navigate to `localhost:3000` or your specified port
  
* To test, run `npm test`


## Future Features
* Show user completed trails as markers on Google Map in Profile section
* Allow user to search trails based on current location
* User should be allowed to add a rating
* User should be allowedto leave feedback or comments
* User should be able to post or share the completed trail details on Social Media
