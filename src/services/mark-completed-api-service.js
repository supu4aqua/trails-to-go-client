import TokenService from "../services/token-service";
import config from "../config";

const CompletedApiService = {
  getCompletedTrails() {
    return fetch(`${config.API_ENDPOINT}/users/${userId}/completed`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postCompletedTrails(trailId, userId, name, length, starVotes, stars) {
    return fetch(`${config.API_ENDPOINT}/completed`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        trail_id: trailId,
        user_Id: userId,
        name,
        length,
        starVotes,
        stars,
      }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default CompletedApiService;
