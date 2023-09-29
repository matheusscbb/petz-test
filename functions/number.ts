export const addLeadingZero = (number: number) => number.toString().padStart(2, '0');

export const numberToBrCurrency = (number: number) => number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;

export const calculateFee = (generations: number[], value: number) => {
    // Find the highest generation
    const highestGeneration = Math.max(...generations);

    // Calculate the fee
    let fee = highestGeneration * 0.03; // We add a 3% fee

    if (fee > 0.3) {
        fee = 0.3; // Limit up to 30%
    }

    return value * fee;
}