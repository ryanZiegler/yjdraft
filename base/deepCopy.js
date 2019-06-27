function deepCopy(obj) {
    //判断是否是简单数据类型，
    if (typeof obj == "object") {
        //复杂数据类型
        var result = obj.constructor == Array ? [] : {};
        for (let i in obj) {
            result[i] = typeof obj[i] == "object" ? deepCopy(obj[i]) : obj[i];
        }
    } else {
        //简单数据类型 直接 == 赋值
        var result = obj;
    }
    return result;
}


// 构造函数
function person(pname) {
    this.name = pname;
  }
  
  const Messi = new person('Messi');
  
  // 函数
  function say() {
    console.log('hi');
  };

const oldObj = {
    a: say,
    b: new Array(1),
    c: new RegExp('ab+c', 'i'),
    d: Messi
  };
const newObj = JSON.parse(JSON.stringify(oldObj));

const a = { name: '你好', age: 19, func: function() { console.log(666) } };
const b = deepCopy(oldObj);
console.log(b.d.constructor);

const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
      case 'Array':
        flag = typeString === '[object Array]';
        break;
      case 'Date':
        flag = typeString === '[object Date]';
        break;
      case 'RegExp':
        flag = typeString === '[object RegExp]';
        break;
      default:
        flag = false;
    }
    return flag;
  };

  const getRegExp = re => {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  };
  
/**
* deep clone
* @param  {[type]} parent object 需要进行克隆的对象
* @return {[type]}        深克隆后的对象
*/
const clone = parent => {
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];
  
    const _clone = parent => {
      if (parent === null) return null;
      if (typeof parent !== 'object') return parent;
  
      let child, proto;
  
      if (isType(parent, 'Array')) {
        // 对数组做特殊处理
        child = [];
      } else if (isType(parent, 'RegExp')) {
        // 对正则对象做特殊处理
        child = new RegExp(parent.source, getRegExp(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (isType(parent, 'Date')) {
        // 对Date对象做特殊处理
        child = new Date(parent.getTime());
      } else {
        // 处理对象原型
        proto = Object.getPrototypeOf(parent);
        // 利用Object.create切断原型链
        child = Object.create(proto);
      }
  
      // 处理循环引用
      const index = parents.indexOf(parent);
  
      if (index != -1) {
        // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
        return children[index];
      }
      parents.push(parent);
      children.push(child);
  
      for (let i in parent) {
        // 递归
        child[i] = _clone(parent[i]);
      }
  
      return child;
    };
    return _clone(parent);
  };
  