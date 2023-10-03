import { render, fireEvent } from "@testing-library/react";

import { Button } from "components";

describe("Button", () => {
  it("should render a Button", () => {
    const { getByText } = render(<Button>Click me</Button>);
    const buttonElement = getByText(/Click me/i);

    expect(buttonElement).toBeTruthy();
  });

  it("calls onClick prop when clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    const buttonElement = getByText(/Click me/i);

    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
