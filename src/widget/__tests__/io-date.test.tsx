/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/jest-globals";
import { render, screen } from "@testing-library/react";
import React from "react";

import IODate from "../io-date";

// https://jestjs.io/fr/docs/expect
test("io-date", () => {
  render(<IODate readonly label="test" value={new Date(2023, 0, 2)} />);
  expect(screen.getByText("Jan 02, 2023")).toBeInTheDocument();
});

test("empty", () => {
  const { container } = render(<IODate readonly label="test" value={null} />);
  expect(container).toBeEmptyDOMElement();
});
