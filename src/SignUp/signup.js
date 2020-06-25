import React, { Component } from "react";
import "./signup.css";
import Context from "../Context";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";
import AuthApiService from "../services/auth-api-service";

class SignUp extends Component {
  static contextType = Context;

  state = { error: null };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push("/signin");
  };


  handleSubmit = ev => {
    ev.preventDefault()
    const { full_name, user_name, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      full_name: full_name.value,
    })
      .then(user => {
        full_name.value = ''
        user_name.value = ''
        password.value = ''
        this.handleRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state;
    return (
      <div role="main" className="main-landing">
        <Nav />
        <header>
          <h3>Sign up for a new account</h3>
        </header>
        <form className="RegistrationForm" onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="full_name">
            <label htmlFor="RegistrationForm__full_name" required>
              Full name{" "}
            </label>

            <input
              name="full_name"
              type="text"
              required
              id="RegistrationForm__full_name"
            />
          </div>
          <div className="user_name">
            <label htmlFor="RegistrationForm__user_name" required>
              User name{" "}
            </label>
            <input
              name="user_name"
              type="text"
              required
              id="RegistrationForm__user_name"
            />
          </div>
          <div className="password">
            <label htmlFor="RegistrationForm__password" required>
              Password{" "}
            </label>
            <input
              name="password"
              type="password"
              required
              id="RegistrationForm__password"
            />
          </div>
          <button type="submit">Register</button>
        </form>

        <Footer />
      </div>
    );
  }
}

export default SignUp;
