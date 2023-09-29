import { render, screen } from "@testing-library/react";

import Form from "pages/agendar-consulta";

import { push, useRouter } from "__mocks__/next/router";

describe("Form", () => {
  it("should render a page title", () => {
    useRouter.mockImplementation(() => ({
      pathname: "/agendar-consulta",
      push: push,
    }));

    render(<Form />);

    expect(
      screen.getByText("Preencha o formulário abaixo para agendar sua consulta")
    ).toBeTruthy();
  });
});
