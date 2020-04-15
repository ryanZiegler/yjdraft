function myDescartes() {
    return Array.prototype.reduce.call(arguments, function(a, b) {
        var ret = [];
        a.forEach(a => {
            b.forEach(b => {
                ret.push(a.concat([b]));
            })
        });
        return ret;
    }, [[]]);
}

console.log(myDescartes(['1', '8'], ['a', 'c'], ['x', 'y'], ['[', '}']));