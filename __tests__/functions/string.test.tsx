import { hourStringAdjust } from "functions";

describe("hourStringAdjust", () => {
  it("should adjust hour string format", () => {
    const date = "10:30";
    const adjustedDate = hourStringAdjust(date);

    expect(adjustedDate).toBe("10h30m");
  });

  it("should handles empty string", () => {
    const date = "";
    const adjustedDate = hourStringAdjust(date);

    expect(adjustedDate).toBe("");
  });

  it("should handles invalid date format", () => {
    const date = "invalid-format";
    const adjustedDate = hourStringAdjust(date);

    expect(adjustedDate).toBe("");
  });
});
