// (function(){
//     var foo = function  (x) {
//         var bar = 3;
//         return function(y) {
//             ++bar;
//             console.log(x + y + bar)
//         }
//     }
//     var moo = foo(2);
//     moo(1);
//     moo(1);
// })();

function Foo() {
    getName = function() {console.log(1)};
    return this;
}
Foo.getName = function() {console.log(2)};
Foo.prototype.getName = function() {console.log(3)};
var getName = function() {console.log(4)};
function getName() {console.log(5)};

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();