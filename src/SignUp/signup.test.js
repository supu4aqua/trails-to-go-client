import React from "react";
import { render } from "@testing-library/react";
import SignUp from "./SignUp";

test("renders learn react link", () => {
  const { getByText } = render(<SignUp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
