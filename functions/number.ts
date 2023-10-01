import { __VALUE_PER_POKEMON } from "constants/form";
import { __ROMAN_NUMERALS } from "constants/numerals";

export const addLeadingZero = (number: number) => number.toString().padStart(2, '0');

export const numberToBrCurrency = (number: number) => number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const calculateFee = (highestGeneration: number) => {
    let fee = highestGeneration * 0.03;

    if (fee > 0.3) {
        fee = 0.3;
    }

    return fee;
}

export const calculateTotal = (highestGeneration: number, pokemonQuantity: number) => {
    const fee = calculateFee(highestGeneration);

    return numberToBrCurrency(__VALUE_PER_POKEMON * pokemonQuantity * (fee + 1));
}

export const romanToArabic = (romanNumeral: string) => {
    let arabicNumeral = 0;
    let previousValue = 0;

    for (let i = romanNumeral.length - 1; i >= 0; i--) {
        const currentValue = __ROMAN_NUMERALS[romanNumeral[i]];

        if (currentValue >= previousValue) {
            arabicNumeral += currentValue;
        } else {
            arabicNumeral -= currentValue;
        }

        previousValue = currentValue;
    }

    return arabicNumeral;
}