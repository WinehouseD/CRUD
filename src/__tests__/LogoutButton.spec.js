import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogoutButton from "../components/LogoutButton";

describe("LogoutButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    render(<LogoutButton />);
    const button = screen.getByRole("button", { name: /Log out/i });
    expect(button).toBeInTheDocument();
  });
});
