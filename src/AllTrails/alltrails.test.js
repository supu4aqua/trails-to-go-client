import React from "react";
import { render } from "@testing-library/react";
import AllTrails from "./AllTrails";

test("renders learn react link", () => {
  const { getByText } = render(<AllTrails />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
