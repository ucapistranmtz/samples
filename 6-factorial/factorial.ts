

const factorial = (n: number): number => {
 
   if (n== 0 || n === 1) {
    return 1;
    }
    if (n < 0) {
      throw new Error("Factorial is not defined for negative numbers");
    }
    
    return n * factorial(n-1)
}


export default factorial;