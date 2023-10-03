import { fireEvent, render, screen } from "@testing-library/react";

import { WarningSchedule } from "components";

describe("WarningSchedule ", () => {
  const failtType = "FAIL";
  const successType = "SUCCESS";
  const __WARNING_TEXT = "Warning Text";

  const onClickMock = jest.fn();

  it("should render a WarningSchedule with success type ", () => {
    render(
      <WarningSchedule onClick={onClickMock} type={successType}>
        {__WARNING_TEXT}
      </WarningSchedule>
    );

    expect(screen.getByText("Consulta Agendada")).toBeTruthy();
    expect(screen.getByAltText("Logo do agendamento")).toBeTruthy();
    expect(screen.getByAltText("Logo do agendamento").getAttribute("src")).toBe(
      "/check.svg"
    );
    expect(screen.getByText(__WARNING_TEXT)).toBeTruthy();
    expect(screen.getByText("Fazer Novo Agendamento")).toBeTruthy();
  });

  it("should render a WarningSchedule with fail type ", () => {
    render(
      <WarningSchedule onClick={onClickMock} type={failtType}>
        {__WARNING_TEXT}
      </WarningSchedule>
    );

    expect(screen.getByText("Houve um problema no agendamento")).toBeTruthy();
    expect(screen.getByAltText("Logo do agendamento")).toBeTruthy();
    expect(screen.getByAltText("Logo do agendamento").getAttribute("src")).toBe(
      "/warning.svg"
    );
    expect(screen.getByText(__WARNING_TEXT)).toBeTruthy();
    expect(screen.getByText("Fazer Novo Agendamento")).toBeTruthy();
  });

  it("should calls onClick function when button is cllicked", () => {
    render(
      <WarningSchedule onClick={onClickMock} type={successType}>
        {__WARNING_TEXT}
      </WarningSchedule>
    );

    fireEvent.click(screen.getByText("Fazer Novo Agendamento"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
