/**
 * 大数之和
 * @param {*} a 
 * @param {*} b 
 */
function bigNumberSum(a, b) {
    let temp = 0,
        res = '';
    
    a = a.toString().split('');
    b = b.toString().split('');
    
    while(a.length || b.length || temp) {
        // true + 1 => 1    false + 1 => 1
        temp += ~~a.pop() + ~~b.pop();
        res = temp % 10 + res;
        temp = temp > 9; 
    }

    return res.replace(/^0+/, '');
}

console.log(bigNumberSum('0001', '002'));