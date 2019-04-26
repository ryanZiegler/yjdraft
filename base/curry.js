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