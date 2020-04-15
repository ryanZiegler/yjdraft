var prices = [7,1,5,3,6,4];

function maxProfit(prices) {
    let max = 0;
    for(let i = 0; i < prices.length; i++) {
        for(let j = i + 1; j < prices.length; j++) {
            max = Math.max(max, prices[j] - prices[i])
        }
    }

    return max;
}

console.log(maxProfit(prices));

function maxProfitAll(prices) {
    
}