const a = [1,1,2,2];
const b = [1,2];

a.sort(a - b);
b.sort(a - b);

function sortIntersection() {
    const c = [];
    for(let i = 0, j = 0; i < a.length;) {
        if (j > b.length) break;
        if (a[i] = b[j]) {
            i++;
            j++;
            c.push(a[i]);
        } else if (a[i] > b[j]) {
            j++;
        } else {
            i++;
        }
    }
    return c;
}

console.log(sortIntersection());


function hashIntersection() {
    const c = [];
    const hash = {};
    a.map(e => {
        if (!hash[e]) {
            hash[e] = 1;
        } else {
            hash[e]++;
        }
    });
    for(let i = 0; i < b.length; i++) {
        if (hash[a[i]] > 0) {
            c.push(a[i]);
            hash[a[i]]--;
        }
    }

    return c;
}
console.log(hashIntersection());