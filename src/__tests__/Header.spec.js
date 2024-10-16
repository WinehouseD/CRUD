import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../components/Header";

describe("Header Component", () => {
  it("should render the component correctly", () => {
    render(<Header />);
    const headerElement = screen.getByText(/todos/i);
    expect(headerElement).toBeInTheDocument();
  });

  it("should have the correct styles", () => {
    render(<Header />);
    const headerElement = screen.getByText(/todos/i);
    expect(headerElement).toHaveStyle({
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      backgroundColor: "#3498db",
      color: "#fff",
      padding: "1.25rem",
      textAlign: "left",
      fontSize: "1.1rem",
      textTransform: "uppercase",
      letterSpacing: "2px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      zIndex: "100",
    });
  });

  it("should contain the correct text", () => {
    render(<Header />);
    const headerElement = screen.getByText(/todos/i);
    expect(headerElement).toHaveTextContent("todos");
  });
});
