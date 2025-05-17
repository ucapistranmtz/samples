
function memoizedFibonacci(n,memo={}){

    // if n is in mem memo we return the value we have stored
    // if not we calculate the value and store it in memo
    if (n in memo) return memo[n];
    // if n is less than 2 we return n
    if (n<2) return n;
    // we store the value in memo
    // we calculate the value using recursion
    // we return the value
    // we use memoization to store the value
    memo[n]= memoizedFibonacci(n-1,memo)+memoizedFibonacci(n-2,memo);
    return  memo[n];
};


module.exports = memoizedFibonacci;
