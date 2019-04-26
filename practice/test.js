(function(){
    var foo = function  (x) {
        var bar = 3;
        return function(y) {
            ++bar;
            console.log(x + y + bar)
        }
    }
    var moo = foo(2);
    moo(1);
    moo(1);
})();