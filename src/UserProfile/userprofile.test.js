import React from "react";
import ReactDOM from "react-dom";
import UserProfile from "./userprofile";

import { BrowserRouter as Router } from "react-router-dom";

describe("UserProfile component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <UserProfile />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
