import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./signin.css";
import Context from "../Context";
import Nav from "../Nav/nav";
import Footer from "../Footer/footer";

class SignIn extends Component {
  static contextType = Context;
  render() {
    return (
      <div role="main" className="main-landing">
      <Nav />
      <header>
            <h3>Login</h3>
        </header>
        <form className='signin-form'>
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" name='username' id='username' />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' id='password' />
              </div>
              <button type='submit'>Sign In</button>
              <button type="button">Cancel</button>
          </form>

        <Footer />
      </div>
    );
  }
}

export default SignIn;
