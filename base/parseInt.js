// 解析一个字符串,并返回一个整数
function _parseInt(string, radix) {
    // 判断string是否为 String/Number
    if (typeof string !== 'string' && typeof string !== 'number') return NaN;
    // 如果省略该参数或其值为 0，则数字将以 10 为基础来解析
    // 如果它以 “0x” 或 “0X” 开头，将以 16 为基数
    // 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN
    if (radix && (typeof radix !== 'number' || radix < 2 || radix > 36)) return NaN;
    
}