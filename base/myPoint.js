// 手写call
// a.call(b) b即可调用a中的方法
console.log('--------call--------');
Function.prototype.myCall = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    // 如果不传入context,默认window
    context = context || window;
    // 防止原fn被覆盖,消失
    let fn = Symbol();
    context[fn] = this;
    var args = [...arguments].slice(1);
    var result = context[fn](...args);
    delete context[fn];
    return result;
}

console.log('--------apply--------');
Function.prototype.myApply = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    // 如果不传入context,默认window
    context = context || window;
    let fn = Symbol();
    context[fn] = this;
    let result;
    if (arguments[1]) {
        result = context[fn](...arguments[1]);
    } else {
        result = context[fn]();
    }
    delete context[fn];
    return result;
}

console.log('--------bind--------');
Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    // 保存this
    const _this = this;
    // 支持柯里化形式传参 fn(1)(2)
    const args = [...arguments].slice(1);

    return function F() {   
        if (this instanceof F) {
            return new _this(...args, ...arguments);
        }
        // 第一次保存的参数args加上再次获取的参数
        return _this.apply(context, args.concat(...arguments));
    }
    
}


function A(name, desc) {
    this.sx = 'a';
    this.name = name;
    this.desc = desc;
    this.getName = function () {
        console.log(name);
    }
}

function B(name, desc) {
    this.sx = 'b';
    A.myCall(this, name, desc);
}

var c = new B('大宝', '孩子');
c.getName();
console.log(c.sx);
