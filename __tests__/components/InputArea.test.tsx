import { render, screen, fireEvent } from "@testing-library/react";

import { InputArea } from "components";

describe("InputArea", () => {
  const label = "Name";
  const placeholder = "Name";
  const error = "Name is required";
  const valueToTest = "Name change";

  const onChangeMock = jest.fn().mockReturnValue(valueToTest);

  it("should render a InputArea", () => {
    render(
      <InputArea
        value=""
        label={label}
        error={error}
        onChange={onChangeMock}
        placeholder={placeholder}
      />
    );

    expect(screen.getByText(label)).toBeTruthy();
    expect(screen.getByText(error)).toBeTruthy();
    expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it("should call handleChange on onChange event", () => {
    render(
      <InputArea
        value=""
        label={label}
        error={error}
        placeholder={placeholder}
        onChange={onChangeMock}
      />
    );

    fireEvent.change(screen.getByPlaceholderText(placeholder), {
      target: { value: valueToTest },
    });

    expect(onChangeMock).toHaveBeenCalled();
  });
});
