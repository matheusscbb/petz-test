import { render, screen } from "@testing-library/react";
import { useRouter } from "__mocks__/next/router";

import { Breadcrumb } from "components";
import { breadcrumbTitleAdjustment, getLastItem } from "functions";

describe("Breadcrumb", () => {
  const pathname = "/unique-path-to-test";

  it("should render a breadbrumb", () => {
    useRouter.mockImplementation(() => ({
      pathname: pathname,
    }));

    render(<Breadcrumb />);

    const splitedPathname = getLastItem(pathname.split("/"));

    splitedPathname.map((name: string) =>
      name === ""
        ? expect(screen.getByText("Home"))
        : expect(screen.getByTitle(breadcrumbTitleAdjustment(name)))
    );
  });

  it("should render a title with the pathname", () => {
    useRouter.mockImplementation(() => ({
      pathname: pathname,
    }));

    render(<Breadcrumb />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: breadcrumbTitleAdjustment(
          getLastItem(pathname.split("/")).toString()
        ),
      })
    ).toBeTruthy();
  });

  it("should render a subtitle", () => {
    useRouter.mockImplementation(() => ({
      pathname: pathname,
    }));

    render(<Breadcrumb description="Mock subtitle that should be rendered" />);

    expect(
      screen.getByText("Mock subtitle that should be rendered")
    ).toBeTruthy();
  });
});
