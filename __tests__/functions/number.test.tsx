import {
  calculateFee,
  romanToArabic,
  calculateTotal,
  addLeadingZero,
  numberToBrCurrency,
} from "functions";

describe("addLeadingZero", () => {
  it("should add leading zero to single-digit numbers", () => {
    const result = addLeadingZero(1);

    expect(result).toBe("01");
  });

  it("shouldn't add leading zero to double-digit numbers", () => {
    const result = addLeadingZero(10);

    expect(result).toBe("10");
  });
});

// TODO solve problem with currency
// describe("numberToBrCurrency", () => {
//   it("should convert a number to Brazilian currency format", () => {
//     let result = numberToBrCurrency(70);
//     const value: string = "R$ 70,00";

//     expect(result == value).toBeTruthy();
//   });
// });

describe("calculateFee", () => {
  it("should calculate a fee based on highest pokemon generation", () => {
    const result = calculateFee(3);

    expect(result).toBe(0.09);
  });
});

// TODO solve problem with currency
// describe("calculateTotal", () => {
//   it("should calculate a total cost with fee and quantity", () => {
//     const result = calculateTotal(3, 5);

//     expect(result).toBe("R$ 381,50");
//   });
// });

describe("romanToArabic", () => {
  it("should convert Roman numeral to Arabic numeral", () => {
    const result = romanToArabic("IV");

    expect(result).toBe(4);
  });
});
