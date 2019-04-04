// 手写call
// a.call(b) b即可调用a中的方法
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
    this.fn = 'A';
    this.name = name;
    this.desc = desc;
    this.getName = function () {
        console.log(this.name);
    }
    this.introduce = function () {
        console.log(this.name + '是一名' +this.desc);
    }
}

console.log('--------call--------');
function Test1(name, desc) {
    this.fn = 'Test1';
    A.myCall(this, name, desc);
}

var test1 = new Test1('ego', '前端抠脚师');
console.log(test1.fn);
test1.introduce();

console.log('--------apply--------');
function Test2(arr) {
    this.fn = 'Test2';
    A.myApply(this, arr);
}

// var test1 = new Test2(['ego', '前端抠脚师']);
Test2(['ego', '前端抠脚师']);
console.log(test1.fn);
test1.introduce();

console.log('--------bind--------');
var Tools = {
    name: '工具',
    desc() {
        console.log(this.name + '可以被人使用');
    }
}

var Car = {
    name: '汽车'
}

var car = Tools.desc.myBind(Car);
car();