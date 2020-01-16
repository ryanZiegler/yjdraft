// 函数柯里化通用实现
function curry(func) {
    // 或Array.prototype.slice.call(arguments, 1)
    let args = [].slice.call(arguments, 1);

    return function () {
        // 或Array.prototype.slice.call(arguments)
        let innerArgs = [].slice.call(arguments);

        // ES6数组扩展运算符[…]，数组合并也可以用concat()
        let finalArgs = [...args, ...innerArgs];

        return func.apply(null, finalArgs);
    }
}

/**
 *  add(1); 	    // 1
 *  add(1)(2);  	// 3
 *  add(1)(2)(3)；  // 6
 *  add(1)(2, 3);   // 6
 *  add(1, 2)(3);   // 6
 *  add(1, 2, 3);   // 6
 */
function add() {
    let args = [].slice.call(arguments);
    let fn = function() {
        if (!arguments.length) {
            console.log(args.reduce((a,b)=> a + b));
        }
        
        let fn_args = [].slice.call(arguments);

        return add.apply(null,args.concat(fn_args));
    }
  
    fn.toString = function() {
        return args.reduce((a,b)=> a + b);
    }
    
    return fn;
}

console.log(add(1)(2,3)(4,5,6)(7,8,9,10).toString());
add(1)(2,3)(4,5,6)(7,8,9,10)();


// 柯里化
function compose(...funcs) {
    if (funcs.length ===0) {
        return arg => arg
    }
    if (funcs.length ===1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
const fn1 = function() {console.log(1)}
const fn2 = function() {console.log(2)}
const fn3 = function() {console.log(3)}
const res = compose(fn1, fn2, fn3);
console.log(res());