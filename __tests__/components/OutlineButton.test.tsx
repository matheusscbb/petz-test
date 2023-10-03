import { render, screen, fireEvent } from "@testing-library/react";

import { OutlineButton } from "components";

describe("OutlineButton", () => {
  const buttonText = "Click Me";
  const onClickMock = jest.fn();

  it("should render a OutlineButton", () => {
    render(<OutlineButton onClick={onClickMock}>{buttonText}</OutlineButton>);

    expect(screen.getByText(buttonText)).toBeTruthy();

    fireEvent.click(screen.getByText(buttonText));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
