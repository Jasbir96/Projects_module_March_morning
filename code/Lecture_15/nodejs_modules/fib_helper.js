function calculateFibonacci(number) {
    // this code is snychonous and will execute competely in call stack
    if (number <= 1) {
        return number;
    }
    return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
}
// here you will getting the data in process
process.on("message", function ({ target }) {
//    processing
    const result = calculateFibonacci(parseInt(target));
   
    process.send(result);
})