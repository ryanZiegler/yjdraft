// 求斐波那契数列第n项
let num = 0;
function fib(n) {
    num++;
    if (n <= 2) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
}

console.log(fib(10));
console.log('执行次数:' + num);

let count = 0;
function fibonacci(n) {
    const cache = [];
    
    function fib(n) {
        count++;
        
        if (cache[n]) {
            return cache[n];
        }
    
        if (n <= 2) {
            cache[n] = 1;
            return 1;
        }
        const temp = fib(n - 1) + fib(n - 2);
        cache[n] = temp;
        return temp;
    }

    return fib(n);
}

console.log(fibonacci(10));
console.log('执行次数:' + count);
