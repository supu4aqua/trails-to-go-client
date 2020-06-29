import React from "react";
import { render } from "@testing-library/react";
import Nav from "./Nav";

test("renders learn react link", () => {
  const { getByText } = render(<Nav />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
