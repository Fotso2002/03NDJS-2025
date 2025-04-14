// math.js

// Function to add two numbers
function sum(a, b) {
    return a + b;
}

// Function to subtract two numbers
function diff(a, b) {
    return a - b;
}

// Function to multiply two numbers
function prod(a, b) {
    return a * b;
}

// Function to divide two numbers
function quot(a, b) {
    return a / b;
}

// Exporting the functions
module.exports = {
    sum: (a, b) => a + b,
    diff: (a, b) => a - b,
    prod: (a, b) => a * b,
    quot: (a, b) => a / b
  };
  