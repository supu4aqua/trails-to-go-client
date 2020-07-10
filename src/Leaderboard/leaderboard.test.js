import React from "react";
import Leaderboard from "./Leaderboard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Leaderboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
