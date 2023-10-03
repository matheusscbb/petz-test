import { render, screen, fireEvent } from "@testing-library/react";

import { Select } from "components";

describe("Select ", () => {
  const onChangeMock = jest.fn();

  const testId = "select-id";
  const placeholder = "Select an option";
  const options = [
    { id: 1, value: "option1", label: "Option 1" },
    { id: 2, value: "option2", label: "Option 2" },
  ];

  it("should render a Select ", () => {
    render(
      <Select
        value={null}
        options={options}
        data-testid={testId}
        onChange={onChangeMock}
        placeholder={placeholder}
      />
    );

    const selectElement = screen.getByTestId(testId);

    expect(selectElement).toBeTruthy();
    expect(screen.getByText(placeholder)).toBeTruthy();

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeTruthy();
    });

    const nullCaseOption = screen.queryByText("NULL_CASE");
    expect(nullCaseOption).toBeNull();
  });

  it("should calls onChange function when select value changes", () => {
    render(
      <Select
        value={null}
        options={options}
        data-testid={testId}
        onChange={onChangeMock}
        placeholder={placeholder}
      />
    );

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "New Value" } });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
