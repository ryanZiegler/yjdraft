// 首先创建一个类
function Animal(name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function() {
        console.log(this.name + '正在睡觉');
    }
}
// 原型方法
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food);
}

// 原型继承
console.log('---------------原型继承---------------');  // 无法实现多继承
function Cat() { };
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

var cat = new Cat();
console.log(cat.name);
cat.eat('fish');
cat.sleep();
console.log(cat instanceof Cat);
console.log(cat instanceof Animal);  

// 构造继承
console.log('---------------构造继承---------------');
function Dog(name) {
    Animal.call(this);
    this.name = name || 'Tom';
}

var dog = new Dog();
console.log(dog.name);
// dog.eat('fish');    // 只能继承父类实例的属性和方法，不能继承原型上的属性和方法。
dog.sleep();
console.log(dog instanceof Dog);
console.log(dog instanceof Animal);  

// 组合继承
console.log('---------------组合继承---------------');  // 调用了两次父类构造函数，生成了两份实例
function Monkey(name) {
    Animal.call(this);
    this.name = name || 'wk';
}
Monkey.prototype = new Animal();
Monkey.prototype.constructor = Monkey;

var monkey = new Monkey();
console.log(monkey.name);
monkey.eat('banana');
monkey.sleep();
console.log(monkey instanceof Monkey);
console.log(monkey instanceof Animal); 

// 寄生组合继承
console.log('---------------寄生组合继承---------------');
function Bird(name) {
    Animal.call(this);
    this.name = name || 'niao';
}
// 方法1
(function() {
    // 创建一个没有实例方法的类
    var Super = function() {};
    Super.prototype = Animal.prototype;
    //将实例作为子类的原型
    Bird.prototype = new Super();
})();
// 方法2 ES6 class集成Babel转化代码
Bird.prototype = Object.create(Animal.prototype, {
    constructor: {
        value: Bird,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

var bird = new Bird();
console.log(bird.name);
bird.eat('worm');
bird.sleep();
console.log(bird instanceof Bird);
console.log(bird instanceof Animal); 

