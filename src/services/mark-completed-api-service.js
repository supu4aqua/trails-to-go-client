import TokenService from '../services/token-service'
import config from '../config'

const CompletedApiService = {
  getCompleted(user_name) {
    return fetch(`${config.API_ENDPOINT}/users/${user_name}/completed`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postCompleted(user_name, trailId) {
    return fetch(`${config.API_ENDPOINT}/completed`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        user_name,
        trailId,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default CompletedApiService
