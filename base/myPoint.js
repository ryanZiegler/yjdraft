// 手写call
// a.call(b) b即可调用a中的方法
console.log('--------call--------');
Function.prototype.myCall = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context.fn = this;
    var args = [...arguments].slice(1);
    var result = context.fn(...args);
    delete context.fn;
    return result;
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

console.log('--------bind--------');

