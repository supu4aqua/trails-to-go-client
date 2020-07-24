import React from "react";
import ReactDOM from "react-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import Leaderboard from "./Leaderboard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const renderer = new ShallowRenderer();
  renderer.render(<Leaderboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
