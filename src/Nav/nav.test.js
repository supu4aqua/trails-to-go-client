import React from "react";
import ReactDOM from "react-dom";
import Nav from "./nav";

import { BrowserRouter as Router } from "react-router-dom";

describe("Nav component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Nav />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
