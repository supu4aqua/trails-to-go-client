import React from "react";
import ReactDOM from "react-dom";
import Landing from "./landing";

import { BrowserRouter as Router } from "react-router-dom";

describe("Landing component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Landing />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
