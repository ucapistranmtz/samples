const basicFibonacci =(n)=> {
//console.log('bassic fibonacci');
    if(n<2) return n
    return basicFibonacci(n-1)+ basicFibonacci(n-1);
   
}; 

module.exports = basicFibonacci;