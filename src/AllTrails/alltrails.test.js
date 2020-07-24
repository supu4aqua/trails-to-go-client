import React from "react";
import ReactDOM from "react-dom";
import AllTrails from "./alltrails";

import { BrowserRouter as Router } from "react-router-dom";

describe("All trails component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <AllTrails />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
