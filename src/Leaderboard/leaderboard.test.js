import React from "react";
import { render } from "@testing-library/react";
import Leaderboard from "./Leaderboard";

test("renders learn react link", () => {
  const { getByText } = render(<Leaderboard />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
