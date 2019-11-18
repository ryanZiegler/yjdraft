/**
 * 有1块、4块、5块的硬币，求总数和为n的最小硬币数
 * f[n] = f[n-m] + f[m]
 */
function takeChange(num) {
    const f = [0, 1, 2, 3, 1, 1];
    
    for(let i = 6; i <= num; i++) {
        let min = Infinity;
        for(let j = 1; j <= i/2; j++) {
            if (min > f[j] + f[i-j]) {
                min = f[j] + f[i-j]
            }
        }
        f[i] = min;
    }
    console.log(f)
    return f[num];
}
const res = takeChange(12);
console.log(res);

function coinsChange(coins, amount) {
    if (amount < 1) return 0;
    const dp = new Array(amount+1).fill(amount+1);
    dp[0] = 0;
    for(let i = 0; i <= amount; i++) {
        for(let c of coins) {
            if (c <= i) {
                dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
const coinsRes = coinsChange([1,4,5],36);
console.log(coinsRes);
