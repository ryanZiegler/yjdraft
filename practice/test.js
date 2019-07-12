// (function(){
//     var foo = function  (x) {
//         var bar = 3;
//         return function(y) {
//             ++bar;
//             console.log(x + y + bar)
//         }
//     }
//     var moo = foo(2);
//     moo(1);
//     moo(1);
// })();

// function Foo() {
//     getName = function() {console.log(1)};
//     return this;
// }
// Foo.getName = function() {console.log(2)};
// Foo.prototype.getName = function() {console.log(3)};
// var getName = function() {console.log(4)};
// function getName() {console.log(5)};

// Foo.getName();
// getName();
// Foo().getName();
// getName();
// new Foo.getName();
// new Foo().getName();
// new new Foo().getName();

/**
 *  Q: 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
 * 
 */
// 得到一个两数之间的随机整数，包括两个数在内
// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
// }
// // 随机生成10个整数数组, 排序, 去重
// let initArr = Array.from({ length: 10 }, (v) => { return getRandomIntInclusive(0, 99) });
// initArr.sort((a, b) => { return a - b });
// initArr = [...(new Set(initArr))];

// 放入hash表 除以10分类
// let obj = {};
// initArr.map((i) => {
//     const intNum = Math.floor(i/10);
//     if (!obj[intNum]) obj[intNum] = [];
//     obj[intNum].push(i);
// })

// 输出结果
// const resArr = [];
// for(let i in obj) {
//     resArr.push(obj[i]);
// }
// console.log(resArr);

// 连续元素分类
// let continueArr = [], tempArr = [];
// initArr.map((e, index) => {
//     tempArr.push(e);
//     if (initArr[index+1] !== ++e) {
//         continueArr.push(tempArr);
//         tempArr = [];
//     }
// });
// console.log(continueArr);


// let list = [{
//     id: '1',
//     children: [{
//         id: '11',
//         children: [{
//             id: '111'
//         }, {
//             id: '112'
//         }]
//     }]
// }];

// function fn(value) {
//     // 回溯的标记
//     let _p = Symbol('parent');
//     // 找到子节点
//     let result;
//     function _fn(arr, p) {
//         for (let i = 0; i < arr.length; i++) {
//             arr[i][_p] = p;
//             console.log(arr);
//             if (arr[i].id === value) {
//                 result = arr[i];
//                 return;
//             }
//             !result && arr[i].children && _fn(arr[i].children, arr[i])
//         }
//         if (result) return;
//     }
//     _fn(list, null);
    
//     console.log(result);

//     let tmp = [];
//     if (!result) return null;
//     while (result) {
//         tmp.unshift(result.id);
//         result = result[_p];
//     }
//     return tmp;
// }
// console.log(fn('112'));

// 快慢指针
// function st(a, b) {
//     let m = 0, n = 0;
//     const arr = [];
    
//     while(n < b.length) {
//         if (a[m] > b[n]) {
//             arr.push(b[n]);
//             n++;
//             if (n === b.length) {
//                 arr.push(...a.slice(m));
//                 break;
//             }
//         } else {
//             arr.push(a[m]);
//             m++;
//             if (m === a.length) {
//                 arr.push(...b.slice(n));
//                 break;
//             }
//         }
//     }

//     return arr;
// }

// console.log(st([1,2],[3,5]));


// Array.prototype.filterx = function(f) {
//     let result = [];
    
//     for (let i = 0; i < this.length; i++) {
//         // console.log('start', f(this[i]));
//         if (f(this[i])) {
//             result.push(this[i]);
//             // console.log('inner', result);
//         }
//     }
    
//     return result;
// }

// function double(value) {
//     return new Promise(resolve => {
//         resolve(value * 2);
//     });
// }

// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// // console.log(arr.filterx(async value => {
// //     var x = await double(value);
// //     console.log(x);
// //     return x == 4;
// // })); 

// console.log(arr.map(async value => {
//     var x = await double(value);
//     console.log(x);
//     return x;
// }));


// function trans(num) {
//     num = num + '';
    
//     const result = num.length === 1 ? num : trans(num.substring(1)) + num.substring(0, 1);

//     return result;
// }

// console.log(trans(135454123456));

// 手写new
function create() {
    let obj = {};
    const Con = [].slice.call(arguments);
    obj._proto_ = Con.prototype;
    let result = Con.apply(obj, arguments);
    return result instanceof Object ? result : obj;
}

// 手写call
Function.prototype.call = function(content) {
    if (typeof this !== 'function') {
        throw new Error;
    }

    context = context || window;
    const fn = Symbol();
    context[fn] = this;
    const args = [...arguments].slice(1);
    let result = content[fn](...args);
    delete context[fn];
    return result;
}

// 手写apply
Function.prototype.apply = function(context) {
    if (typeof this !== 'function') {
        throw new Error;
    }

    context = context || window;
    const fn = Symbol();
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

// 手写bind
Function.prototype.bind = function(context) {
    if (typeof this !== 'function') {
        throw new Error;
    }

    const _this = this;
    const args = [...arguments].slice(1);
    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, args.concat(...arguments));
    }
}

// 手写reduce
Array.prototype.reduce = function() {
    // 判断忽略 1.arguments length 2.arguments[0] 是否函数 3.ary.length = 0 && arguments[0] 空数组不执行
    const ary = this;
    const { length } = ary;
    const cb = arguments[0];

    const index = arguments.length >= 2 ? 0 : 1;
    let value = index === 0 ? arguments[1] : ary[0];
    for(let i = 0; i < length; i++) {
        value = cb(value, ary[i], i, ary);
    }
    return value;
}

// reduce实现map
Array.prototype.map = function() {
    const ary = this;
    return ary.reduce((acc, value, index, ary) => {
        return acc.concat([arguments[0].call(ary, value, index, ary)]);
    }, []);
}

// reduce实现filter
Array.prototype.filter = function() {
    const ary = this;
    return ary.reduce((acc, value, index, ary) => {
        return arguments[0].call(ary, value, index, ary) ? acc.concat([value]) : acc;
    }, []);
}