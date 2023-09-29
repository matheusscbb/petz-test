import { render, screen } from "@testing-library/react";

import { Footer } from "components";

describe("Footer", () => {
  it("should render a footer", () => {
    render(<Footer />);

    const footerText = screen.getByText(
      "Todas as marcas e ilustrações utilizadas são de seus resepctivos donos."
    );

    expect(footerText).toBeTruthy();
  });
});
