import { render, fireEvent } from "@testing-library/react";

import { Input } from "components";

describe("Input", () => {
  it("should render a Input", () => {
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <Input value="" onChange={handleChange} placeholder="Test Placeholder" />
    );

    const inputElement = getByPlaceholderText("Test Placeholder");

    expect(inputElement).toBeTruthy();
  });

  it("should call handleChange on onChange event", () => {
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <Input value="" onChange={handleChange} placeholder="Test Placeholder" />
    );

    const inputElement = getByPlaceholderText("Test Placeholder");

    fireEvent.change(inputElement, { target: { value: "New Value" } });

    expect(handleChange).toHaveBeenCalled();
  });
});
