import React from "react";
import ReactDOM from "react-dom";
import Login from "./login";

import { BrowserRouter as Router } from "react-router-dom";

describe("Login component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Login />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
