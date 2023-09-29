import { render, screen } from "@testing-library/react";

import About from "pages/quem-somos";

import { push, useRouter } from "__mocks__/next/router";
import { __ABOUT_TEXT } from "constants/about";

import type { IAbout } from "types";

describe("About", () => {
  it("should render a page title", () => {
    useRouter.mockImplementation(() => ({
      pathname: "/quem-somos",
      push: push,
    }));

    render(<About />);

    expect(screen.getByText("O Centro Pokémon")).toBeTruthy();
  });

  it("should render a about text", () => {
    useRouter.mockImplementation(() => ({
      pathname: "/quem-somos",
      push: push,
    }));

    render(<About />);

    const HtmlTiltes = screen.getAllByRole("heading", { level: 4 });
    const textTitles = HtmlTiltes.map((elem: HTMLElement) => elem.textContent);
    const titles = __ABOUT_TEXT.map((text: IAbout) => text.title);

    expect(textTitles.length).toBe(__ABOUT_TEXT.length);

    titles.map((title: string) =>
      expect(textTitles.includes(title)).toBeTruthy()
    );
  });
});
