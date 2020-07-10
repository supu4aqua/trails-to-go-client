export default {
  TRAIL_URL: `https://www.hikingproject.com/data/get-trails`,
  GEOCODE_URL: `https://maps.googleapis.com/maps/api/geocode/json`,
  //  TRAIL_API_KEY: `200584708-6c2ed6bce77a3687c608095444a035bf`,
  TRAIL_API_KEY: process.env.TRAIL_API_KEY,
  //GEOCODE_API_KEY: `AIzaSyA_dsM-989v-ukkzPRkvC4wVUkqMyp2pb8`,
  GEOCODE_API_KEY: process.env.GEOCODE_API_KEY,
  API_ENDPOINT: "http://localhost:8000/api",
  //  TOKEN_KEY: "trails-to-go-client-auth-token",
  TOKEN_KEY: process.env.TOKEN_KEY,
};
