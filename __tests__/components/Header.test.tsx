import { render, screen, fireEvent } from "@testing-library/react";
import { push } from "__mocks__/next/router";

import { Header } from "components";

describe("Header", () => {
  it("should have a link to the about page", () => {
    render(<Header />);

    const aboutButton = screen.getByText("Quem Somos") as HTMLLinkElement;

    expect(aboutButton.href).toBe("http://localhost/quem-somos");
  });

  it("should have a button linking to the form page", () => {
    const { getByText } = render(<Header />);

    const formButton = getByText("Agendar Consulta");

    fireEvent.click(formButton);

    expect(push).toHaveBeenCalledWith("/agendar-consulta");
  });
});
