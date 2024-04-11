import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("Slider", () => {
  it("displays a list card", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });

  it("pauses and resumes slider when spacebar is pressed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );

    // Vérifiez que le slider est en cours de lecture
    const initialTitle = await screen.findByText("World economic forum");
    const initialDescription = await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );

    // Simuler l'appui sur la barre d'espace pour mettre en pause le slider
    fireEvent.keyDown(window, { key: " ", code: "Space" });

    // Vérifiez si le slider est en pause
    const pausedTitle = await screen.findByText("World economic forum");
    const pausedDescription = await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );

    expect(pausedTitle).toEqual(initialTitle);
    expect(pausedDescription).toEqual(initialDescription);

    // Simuler l'appui sur la barre d'espace pour reprendre le slider
    fireEvent.keyDown(window, { key: " ", code: "Space" });

    // Vérifiez si le slider a repris la lecture
    await screen.findByText("World Gaming Day");
    await screen.findByText("World Farming Day");
  });
});
