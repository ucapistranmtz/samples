

/// Fibonacci 
// Fibonacci is a sequence of numbers in which each number is the sum of the two preceding ones, usually starting with 0 and 1.
// The sequence typically starts as follows:
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
// The Fibonacci sequence can be defined using the following recurrence relation:
// F(0) = 0
// F(1) = 1
// F(n) = F(n-1) + F(n-2) for n > 1
// The Fibonacci sequence has many applications in mathematics, computer science, and nature.
// It is often used in algorithms, data structures, and even in financial markets.
// The Fibonacci sequence can be generated using various methods, including recursion, iteration, and memoization.
// In this example, we will implement a simple recursive function to generate the Fibonacci sequence.
// The function will take an integer n as input and return the nth Fibonacci number.
// The time complexity of this recursive implementation is O(2^n), which is not efficient for large values of n.
// However, it is a good example to understand the concept of recursion.
// The Fibonacci sequence can also be generated using an iterative approach, which has a time complexity of O(n).
// The iterative approach is more efficient and is preferred for larger values of n.
// The Fibonacci sequence can also be generated using memoization, which is a technique to store the results of expensive function calls and reuse them when the same inputs occur again.
// Memoization can significantly improve the performance of recursive algorithms by avoiding redundant calculations.
// The Fibonacci sequence can also be generated using dynamic programming, which is a method for solving complex problems by breaking them down into simpler subproblems.
// Dynamic programming is often used in optimization problems and can be applied to the Fibonacci sequence as well.
// The Fibonacci sequence can also be generated using matrix exponentiation, which is a method for calculating the nth Fibonacci number in O(log n) time.
// The matrix exponentiation method is based on the fact that the Fibonacci sequence can be represented using matrix multiplication.
// The Fibonacci sequence can also be generated using Binet's formula, which is a closed-form expression for the nth Fibonacci number.
// Binet's formula is given by:
// F(n) = (phi^n - (1-phi)^n) / sqrt(5)
// where phi is the golden ratio, approximately equal to 1.6180339887.
// The Fibonacci sequence can also be generated using the golden ratio, which is a mathematical constant that appears in many natural phenomena.
// The golden ratio is often denoted by the Greek letter phi (φ) and is defined as:
// phi = (1 + sqrt(5)) / 2

// The Fibonacci sequence can also be generated using the golden ratio and its properties.

// The golden ratio has many interesting properties and appears in various fields, including art, architecture, and nature.

// The Fibonacci sequence can also be generated using the golden ratio and its properties.

const basic = require('./basic');
const memoized = require('./memoized');


const n = 40;

console.time('basicFibonacci');
const basicResult=basic(n);
console.timeEnd('basicFibonacci');
console.log('basicResult', basicResult);






console.time('memoizedFibonacci');
const memoizedResult=memoized(n);
console.timeEnd('memoizedFibonacci');
console.log('memoizedResult', memoizedResult);


 