import React from "react";
import ReactDOM from "react-dom";
import TrailDetails from "./traildetails";

import { BrowserRouter as Router } from "react-router-dom";

describe("TrailDetails component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <TrailDetails test="true" />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
