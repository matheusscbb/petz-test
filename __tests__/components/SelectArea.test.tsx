import { render, screen } from "@testing-library/react";

import { SelectArea } from "components";

describe("SelectArea ", () => {
  const onChangeMock = jest.fn();

  const value = "option1";
  const label = "Select an option";
  const error = "Option is required";

  const options = [
    { id: 1, value: "option1", label: "Option 1" },
    { id: 2, value: "option2", label: "Option 2" },
  ];

  it("should render a Select ", () => {
    render(
      <SelectArea
        label={label}
        error={error}
        value={value}
        options={options}
        onChange={onChangeMock}
      />
    );

    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.getByText(error)).toBeTruthy();
    expect(screen.getByDisplayValue("Option 1")).toBeTruthy();
  });
});
