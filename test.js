// var length = 10;
// function fn() {
//     console.log(this.length);
// }

// var obj = {
//     length: 5,
//     method: function(fn){
//         fn();
//         arguments[0]();
//     }
// }

// obj.method(fn, 1);

// function halfInsert(arr, num) {
//     function searchIndex(arr, num) {
//         // 遍历
//         let i;
//         for (i = 0; i < arr.length; i++) {
//             if (num < arr[i]) break;
//         }
//         // return i;
        
//         // 折半查找
//         let low = 0,
//             high = arr.length;
        
//         while(low < high) {
//             let mid = parseInt((low + high) / 2);
//             if (num > arr[mid]) {
//                 low = mid + 1;
//             } else {
//                 high = mid - 1;
//             }
//         }
//         return low;
//     }

//     let res = searchIndex(arr, num);
//     arr.splice(res, 0, num);
//     return arr;
// }


function halfInsert(arr, num) {
    let low = 0,
    high = arr.length,
    mid = parseInt(arr.length/2);
    
    if(arr[mid] === num) return true;
    if(mid === 0) return false;
    if(arr[mid] > num) return halfInsert(arr.slice(low, mid - 1), num);
    if(arr[mid] < num) return halfInsert(arr.slice(mid + 1, high - 1), num);
    
}

console.log(halfInsert([1,4,6,9,11,15,18], 0));

