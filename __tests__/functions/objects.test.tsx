import { objectIsEmpty } from "functions";

describe("objectIsEmpty", () => {
  it("should return true for an empty object", () => {
    const emptyObject = {};
    const result = objectIsEmpty(emptyObject);

    expect(result).toBe(true);
  });

  it("should return false for an object with properties", () => {
    const objectWithProps = { prop1: "value1", prop2: "value2" };
    const result = objectIsEmpty(objectWithProps);

    expect(result).toBe(false);
  });
});
