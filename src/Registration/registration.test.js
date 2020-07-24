import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration";

import { BrowserRouter as Router } from "react-router-dom";

describe("Registration component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Registration />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
