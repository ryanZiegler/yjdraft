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

// let str = '1,2,3,5,7,8,10';
// function transform(str) {
//     let res = [];
//     let arr = str.split(',').map(i => +i);

//     let temp = arr[0];

//     arr.forEach((value, index) => {
//         if (value + 1 !== arr[index + 1]) {
//             if (temp !== value) {
//                 res.push(`${temp}~${value}`)
//             } else {
//                 res.push(`${value}`)
//             }
//             temp = arr[index + 1]
//           }
//     });

//     return res.join(',');
// }

// console.log(transform(str));

// const fn = arr => {
//     const res = []
//     const map = arr.reduce((res, item) => ((res[item.id] = Object.assign({}, item)), res), {})
//     console.log(map);
//     console.log(Object.values(map));
//     for (const item of Object.values(map)) {
//       if (!item.pId) {
//         res.push(item)
//       } else {
//         const parent = map[item.pId]
//         parent.child = parent.child || []
//         parent.child.push(item)
//       }
//     }
//     console.log(arr);
//     return res
// }
  
// const arr = [{id: 1}, {id:2, pId: 1}, {id: 3, pId: 2}, {id: 4}, {id:3, pId: 2}, {id: 5, pId: 4}]
// console.log(fn(arr)) // [{id: 1, child: [{id: 2, pId: 1, child: [{ id: 3, pId: 2}]}]}, {id: 4, child: [{id: 5, pId: 4}]}]

// let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13],
// // let arr = [1,2,3],
//     origin = [],
//     i = 1;

// while(arr.length) {
//     if (i % 2) {
//         origin.unshift(arr.pop());
//     } else {
//         origin.unshift(origin.pop());
//     }
//     i++
// } 

// console.log(origin);


// const arr = [[1],[2],[3],[4]];
// let count = 0;

// arr[count] && arr[count].map(i => {
//     count++;
//     console.log(i);
// })

let temp = 0;
let total = ['10','20','30']
let list = [
    {t: '101'},{t:'102'},{t:'103'},
    {t: '201'},{t:'202'},{t:'203'},
    {t: '301'},{t:'302'},{t:'303'},
]

for(let i=0; i< list.length;i++) {
    if (list[i].t.indexOf(total[temp]) !== -1) {
        list[i].a = total[temp];
        temp ++;
    }
}

console.log(list);