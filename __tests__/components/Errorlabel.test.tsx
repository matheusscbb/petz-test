import { render } from "@testing-library/react";

import { ErrorLabel } from "components";

describe("ErrorLabel", () => {
  it("should render a ErrorLabel", () => {
    const { getByText } = render(<ErrorLabel>Error message</ErrorLabel>);
    const labelElement = getByText(/Error message/i);

    expect(labelElement).toBeTruthy();
  });

  it("applies custom props", () => {
    const labelId = "custom-label";
    const { getByText } = render(
      <ErrorLabel data-testid={labelId}>Custom error message</ErrorLabel>
    );

    const labelElement = getByText(/Custom error message/i);
    expect(labelElement.getAttribute("data-testid")).toBe(labelId);
  });
});
