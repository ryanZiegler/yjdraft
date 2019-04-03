// 冒泡排序
function bubbleSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');
    
    for (let i = 0, l = arr.length; i < l -1; i++) {
        for (let j = 0; j < l - 1; j++) {
            if (arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
};

const bubbleArr = [6,3,8,2,9,1];
bubbleSort(bubbleArr);
console.log('冒泡排序: ', bubbleArr);

// 选择排序
function selectSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    let minIndex, temp;
    for (let i = 0, l = arr.length; i < l - 1; i++ ) {
        minIndex = i;
        for (let j = i + 1; j < l; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
};

const selectArr = [6,3,8,2,9,1];
selectSort(selectArr);
console.log('选择排序: ', selectArr);

// 插入排序
function insertionSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    let current, preIndex;
    for (let i = 1,l = arr.length; i < l; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
};

const insertArr = [6,3,8,2,9,1];
insertionSort(insertArr);
console.log('插入排序: ', insertArr);

// 折半插入 todo

// 希尔排序 跳着选取子序列进行插入排序
// 个数少插入排序快 有序列插入排序快
function shellSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/3) {          //动态定义间隔序列
        gap =gap*3+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}

const shellArr = [6,3,8,2,9,1];
shellSort(shellArr);
console.log('希尔排序: ', shellArr);

// 归并排序(分治法) 递归版本
function mergeSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    const len = arr.length;
    if (len < 2) return arr;
    let middle = len / 2;
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }

    return result;
}

const mergeArr = [6,3,8,2,9,1];
shellSort(mergeArr);
console.log('归并排序: ', mergeArr);

// 快速排序 递归
function quickSort(arr, left, right) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');
    
    let len = arr.length,
        partitionIndex;
    left = typeof left != 'number' ? 0 : left,
    right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

function partition (arr, left, right) {
    let pivot = left,
        index = pivot + 1;
        for (let i = index; i <= right; i++) {
            if (arr[i] < arr[pivot]) {
                swap(arr, i, index);
                index++;
            }
        }
        swap(arr, pivot, index - 1);
        return index - 1;
}

function swap(arr, i, index) {
    let temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
}

const quickArr = [6,3,8,2,9,1];
quickSort(quickArr);
console.log('快速排序: ', quickArr);