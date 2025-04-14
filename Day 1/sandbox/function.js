// function to add two numbers
function add(a, b) {
    return a + b;
}

export const sum = (a, b) => a + b;
import { sum } from "./math.js";
console.log(sum(5, 10)); // 15

// function positive or negative
function positiveOrNegative(num) {
    if (num > 0) {
        return "positive";
    } else if (num < 0) {
        return "negative";
    } else {
        return "zero";
    }
}
