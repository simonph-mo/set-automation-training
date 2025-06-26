
export class Numbers {

async calculateSumOfArray(numbers: number[]): Promise<number>{
    let sum: number = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum
}

async checkNumber (num: number): Promise<string> {
    if (num > 0) {
        return 'The number is positive.';
    } else if (num < 0) {
        return 'The number is negative.';
    } else {
        return 'The number is zero.';
    }
}

}