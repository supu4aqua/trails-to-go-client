import React, { Component } from "react";
import "./signin.css";
import Context from "../Context";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import TokenService from "../services/token-service";
//import AuthApiService from '../services/auth-api-service';

class SignIn extends Component {
  static contextType = Context;

  state = { error: null };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/all-trails";
    history.push(destination);
  };

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(user_name.value, password.value)
    );

    user_name.value = "";
    password.value = "";
    this.handleLoginSuccess();
    /*AuthApiService.postLogin({
        user_name: user_name.value,
        password: password.value,
      })
        .then(res => {
          user_name.value = ''
          password.value = ''
          TokenService.saveAuthToken(res.authToken)
          this.handleLoginSuccess()
        })
        .catch(res => {
          this.setState({ error: res.error })
        })*/
  };

  render() {
    const { error } = this.state;
    return (
      <div role="main" className="main-landing">
        <Nav />
        <header>
          <h3> Login </h3>{" "}
        </header>{" "}
        <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="user_name">
            <label htmlFor="LoginForm__user_name">User name</label>
            <input required name="user_name" id="LoginForm__user_name" />
          </div>
          <div className="password">
            <label htmlFor="LoginForm__password">Password</label>
            <input
              required
              name="password"
              type="password"
              id="LoginForm__password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Footer />
      </div>
    );
  }
}

export default SignIn;
