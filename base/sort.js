/**
 * 冒泡排序
 * 最大或最小会浮(互换)到最上面
 * 
 * @param {Array} arr 
 */
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

// 优化 1:记录此次是否交换  2.最后一次交换的位置  3.正反交替扫描最大值/最小值

const bubbleArr = [6,3,8,2,9,1];
bubbleSort(bubbleArr);
console.log('冒泡排序: ', bubbleArr);

/**
 * 选择排序
 * 逐个选最大或最小
 * 不稳定
 * @param {Array} arr 
 */
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

/**
 * 插入排序
 * 每一次和前面有序数组比,找到插入位置
 * 
 * @param {Array} arr 
 */
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

/**
 * 折半插入排序
 * 有序数组折半查找插入位置
 * 
 * @param {Array} arr 
 */
function halfInsertSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    let current, low, high, mid;
    for (let i = 1,l = arr.length; i < l; i++) {
        current = arr[i];
        low = 0;
        high = i;
        while (low < high) {
            mid = (low + high) / 2;
            if (current > arr[mid]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        for (let j = i - 1; j >= low; j--) {
            arr[j+1] = arr[j];
        }
        arr[low] = current;
    }

    return arr;
}

const halfInsertArr = [6,3,8,2,9,1];
halfInsertSort(halfInsertArr);
console.log('折半插入: ', halfInsertArr);

/**
 * 希尔排序
 * 间隔(gap)跳着选取子序列进行插入排序
 * 个数少插入排序快 有序列插入排序快
 * 不稳定
 * @param {Array} arr 
 */
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

/**
 * 归并排序(递归版本)
 * 分治法 
 * 所有迭代都可以用递归重写
 * 
 * @param {Array} arr 
 */
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

/**
 * 快速排序(递归实现)
 * 还可以用栈实现
 * 冒泡基础上的递归分治法
 * pivot 基准(不动,最后动)
 * 
 * @param {Array} arr 
 * @param {Number} left 
 * @param {Number} right 
 */
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

function quickSort2(arr) {
    if(arr.length <= 1) {
        return arr;  //递归出口
    }
    var left = [],
        right = [],
        current = arr.splice(0,1); 
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < current) {
            left.push(arr[i])  //放在左边
        } else {
            right.push(arr[i]) //放在右边
        }
    }
    return quickSort2(left).concat(current,quickSort2(right));
}

const quickArr = [6,3,8,2,9,1];
quickSort(quickArr);
console.log('快速排序: ', quickArr);

/**
 * 堆排序 (大顶堆, 小顶堆)
 * 1.建立大顶堆  2.堆头,堆尾互换, len--  3.调整大顶堆
 * 不稳定
 * 
 * @param {Array} arr 
 */
function heapSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    let len = arr.length;
    buildMaxHeap(arr);                          // 1

    for (let i = len - 1; i > 0; i--) {         
        swap(arr, 0, i);                        // 2
        len--;
        heapify(arr, 0);                        // 3
    }
    return arr;

    function buildMaxHeap(arr) {
        for (let i = Math.floor(len / 2); i >= 0; i--) {
            heapify(arr, i);
        }
    }

    function heapify(arr, i) {
        let left = 2 * i + 1,
            right = 2* i + 2,
            largest = i;

        if (left < len && arr[largest] < arr[left]) {
            largest = left;
        }

        if (right < len && arr[largest] < arr[right]) {
            largest = right;
        }

        if (largest !== i) {
            swap(arr, i, largest);
            heapify(arr, largest);
        }
    }
}

const heapArr = [6,3,8,2,9,1];
heapSort(heapArr);
console.log('堆排序:   ', heapArr);

/**
 * 计数排序
 * n+k 稳定性强,k为最大排序值
 * 空间换时间
 * 
 * @param {Array} arr 
 */
function countingSort(arr) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    let maxValue = Math.max(...arr),
        sortedIndex = 0,
        bucket = new Array(maxValue + 1),
        bucketLen = maxValue + 1,
        len = arr.length;
    
    for (let i = 0; i < len; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }

    for (let j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }

    return arr;
}

const countingArr = [6,3,8,2,9,1];
countingSort(countingArr);
console.log('计数排序: ', countingArr);

/**
 * 桶排序(箱排序)
 * 计数排序的升级
 * 通过函数映射关系,分治法的究极实现
 * 1.桶越多越快 2.映射函数将N个数均匀放入k个桶
 * 区间分桶
 * 
 * @param {Array} arr 
 * @param {Number} bucketSize 桶个数
 */
function bucketSort(arr, bucketSize) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    const maxValue = Math.max(...arr),
          minValue = Math.min(...arr),
          DEFAULT_BUCKET_SIZE = 3,
          len = arr.length;

    bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const bucket = new Array(bucketCount);
    for (let i = 0; i < bucketCount; i++) {             // 人造桶
        bucket[i] = [];
    }

    // 利用映射函数将数据分配到各个桶中
    for (let i = 0; i < len; i++) {
        bucket[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
    }

    arr.length = 0;
    for (let j = 0; j < bucket.length; j++) {
        if (!bucket[j].length) continue;                // 空桶滚蛋
        insertionSort(bucket[j]);                       // 插入排序
        for (let k = 0; k < bucket[j].length; k++) {
            arr.push(bucket[j][k]);
        }
    }

    return arr;
}

const bucketArr = [63, 157, 189, 51, 101, 47, 141, 121, 157, 156, 194];
bucketSort(bucketArr);
console.log('桶排序:   ', bucketArr);

/**
 * 基数排序
 * 切割位数 分位比较
 * @param {Array} arr 
 * @param {Number} maxDigit 最大位数
 */
function radixSort(arr, maxDigit) {
    if (!Array.isArray(arr) || !arr.length) return console.log('参数非法');
    if (!arr.every(e => { return !isNaN(e) })) return console.log('参数对象非法');

    let counter = [],
        mod = 10,
        dev = 1,
        len = arr.length;

    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        // 按位数排序放进 counter数据
        for (let j = 0; j < len; j++) {
            let bucket = parseInt((arr[j] % mod) / dev);
            if (!counter[bucket]) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
        }
        let index = 0;
        // 按位数顺序重新变成arr
        for (let j = 0; j < counter.length; j++) {
            while (counter[j] && counter[j].length) {
                arr[index++] = counter[j].shift();
            }
        }
    }

    return arr;
}

const radixArr = [63, 157, 189, 51, 101, 47, 141, 121, 157, 156, 194];
radixSort(radixArr, 3);
console.log('基数排序: ', radixArr);


// arr.sort( function(a,b){ return a-b } );  升序   负数
// arr.sort( function(a,b){ return b-a } );  降序   正数
const versionArr = ["1.45.0","1.5","5","5.0","1.5.5.3","3.5.5.5.5.5"];

function rule(a, b) {
    const arr1 = a.split('.'),
        arr2 = b.split('.'),
        minLen = Math.min(arr1.length, arr2.length);

    for(let i = 0; i < minLen; i++) {
        if (+arr1[i] > +arr2[i]) {
            return 1;
        } else if (+arr1[i] < +arr2[i]) {
            return -1;
        }

        // 4.8 和 4.8.0 比较, length短的排前面
        if (i + 1 === minLen) {
            return arr1.length > arr2.length ? 1 : -1;
        }
    }
}

console.log('版本号排序:', versionArr.sort(rule));
