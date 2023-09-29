import { render, screen } from "@testing-library/react";

import Home from "pages";

describe("Home", () => {
  it("should render a Hero text", () => {
    render(<Home />);

    const heroText = screen.getByText(
      "Cuidamos bem do seu pokémon, para ele cuidar bem de você"
    );

    expect(heroText).toBeTruthy();
  });

  it("should render a two images", () => {
    render(<Home />);

    const heroImg = screen.getAllByRole("img");

    expect(heroImg.length).toBe(2);
  });
});
