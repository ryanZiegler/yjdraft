class EventEmeitter {
    constructor() {
        this._events = this._events || new Map();               // 回调函数键值对
        this._maxListeners = this._maxListeners || 10;          // 最大监听者数
    }
}

// 触发 type 事件
EventEmeitter.prototype.emit = function(type, ...args) {
    let handler;
    // 从回调函数键值对取出对应回调方法
    handler = this._events.get(type);

    if (Array.isArray(handler)) {
        for (let i = 0; i < handler.length; i++) {
            if (args.length > 0) {
                handler[i].apply(this, args);
            } else {
                handler[i].call(this);
            }
        }
    } else {
        if (args.length > 0) {
            handler.apply(this, args);
        } else {
            handler.call(this);
        }
    }

    return true;
}

// 监听 type 事件
EventEmeitter.prototype.addListener = function(type, fn) {
    const handler = this._events.get(type);
    if (!handler) {
        this._events.set(type, fn);
    } else if (handler && typeof handler === 'function') {
        // 如果handler是函数说明只有一个监听者
        this._events.set(type, [handler, fn]);
    } else {
        handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
    }
}

// 移除 type 监听
EventEmeitter.prototype.removeListener = function(type, fn) {
    const handler = this._events.get(type);

    if (handler && typeof handler === 'function') {
        // 只监听一次
        this._events.delete(type, fn);
    } else {
        let index;
        // 数组 说明监听多次
        for(let i = 0; i < handler.length; i++) {
            if (fn === handler[i]) {
                index = i;
            } else {
                index = -1;
            }
        }

        if (index !== -1) {
            handler.splice(index, 1);

            // 若数组长度为1 则取消数组
            if (handler.length === 1) {
                this._events.set(type, handler[0]);
            }
        } else {
            return this;
        }
    }
}

// 实例化 测试
const emitter = new EventEmeitter();

emitter.addListener('test', (test) => {
    console.log(`test ${test}`);
});

emitter.emit('test', 'hello');