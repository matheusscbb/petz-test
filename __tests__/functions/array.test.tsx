import { getLastItem, prepareOptions, prepareDate } from "functions";

import type { IResponse } from "types";

describe("getLastItem", () => {
  it("should return the last item in the array", () => {
    const array = [1, 2, 3];
    const result = getLastItem(array);

    expect(result).toEqual([3]);
  });

  it("should return an empty array if is empty", () => {
    const array: any = [];
    const result = getLastItem(array);

    expect(result).toEqual([]);
  });
});

describe("prepareOptions", () => {
  it("should prepare options from response data", () => {
    const data: IResponse = {
      count: 2,
      results: [
        { name: "Option 1", url: "" },
        { name: "Option 2", url: "" },
      ],
    };
    const result = prepareOptions(data);

    expect(result).toEqual([
      { id: 1, value: 1, label: "Option 1" },
      { id: 2, value: 2, label: "Option 2" },
    ]);
  });

  it("should return an empty array if no results in data", () => {
    const data: IResponse = {
      count: 0,
      results: [],
    };
    const result = prepareOptions(data);
    expect(result).toEqual([]);
  });
});

describe("prepareDate", () => {
  it("should prepare options from date strings", () => {
    const data = ["2022-10-01", "2022-10-02"];
    const result = prepareDate(data);

    expect(result).toEqual([
      { id: 1, value: 1, label: "2022-10-01" },
      { id: 2, value: 2, label: "2022-10-02" },
    ]);
  });
});
