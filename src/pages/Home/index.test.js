import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import React from "react";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("should display a list of events", () => {
    // Arrange: Already done in beforeEach
    // Act
    const eventList = screen.getByTestId("event-list");
    // Assert
    expect(eventList).toBeDefined();
  });

  it("should display a list of people", () => {
    // Arrange: Already done in beforeEach
    // Act
    const peopleList = screen.getByTestId("people-list");
    // Assert
    expect(peopleList).toBeDefined();
  });

  it("should display a footer", () => {
    // Arrange: Already done in beforeEach
    // Act
    const testFooter = screen.getByTestId("test-footer");
    // Assert
    expect(testFooter).toBeDefined();
  });

  it("should display an event card with the last event", () => {
    // Arrange: Already done in beforeEach
    // Act
    const lastEvent = screen.getByTestId("last-event");
    // Assert
    expect(lastEvent).toBeDefined();
  });
});
