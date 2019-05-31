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
    let fn = function(){
        let fn_args = [].slice.call(arguments)
        return add.apply(null,args.concat(fn_args))
    }
  
    fn.toString = function(){
        return args.reduce((a,b)=>a+b)
    }
    
    return fn;
}

  console.log(add(1,2)(3)(4).toString());