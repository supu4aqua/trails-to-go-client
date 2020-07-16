import React, { Component } from "react";
import "./login.css";
import Context from "../Context";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import AuthApiService from "../services/auth-api-service";

class Login extends Component {
  static contextType = Context;

  state = { error: null };

  //User logs in successfully, redirect to all-trails page
  handleLoginSuccess = () => {
    const { location, history } = this.props;
    this.context.getCompleted();
    const destination = (location.state || {}).from || "/all-trails";
    history.push(destination);
  };

  //Validate user
  handleSubmitJwtAuth = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        this.handleLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div role="main" className="registration">
        <Nav />
        <header>
          <h3> Login </h3>{" "}
        </header>{" "}
        <form className="RegistrationForm" onSubmit={this.handleSubmitJwtAuth}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="user_name">
            <label htmlFor="LoginForm__user_name">Username</label>
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
          <p>Demo Account : username - demo, password - demoaccount</p>
          <button type="submit">Login</button>
        </form>
        <Footer />
      </div>
    );
  }
}

export default Login;
