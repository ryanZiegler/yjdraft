// 手写一个promise
// 三状态 pending resolve reject
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
    // 获取正确的this指向
    const that = this;
    that.state = PENDING;
    that.value = null;
    // 保存then中的回调
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];

    // resolve/reject函数
    function resolve(value) {
        if (value instanceof MyPromise) {
            return value.then(resolve, reject);
        }

        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = RESOLVED;
                that.value = value;
                that.resolvedCallbacks.map(cb => cb(that.value))
            }
        }, 0);
    }

    function reject(value) {
        setTimeout(() => {
            if (that.state === PENDING) {
                that.state = REJECTED;
                that.value = value;
                that.rejectedCallbacks.map(cb => cb(that.value))
            }
        }, 0);
    }

    // 执行fn函数
    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
};

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const that = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };

    function resolutionProcedure(promise2, x, resolve, reject) {
        if (promise2 === x) {
          return reject(new TypeError('Error'));
        }

        if (x instanceof MyPromise) {
            x.then(function(value) {
                resolutionProcedure(promise2, value, resolve, reject)
            }, reject)
        }
        let called = false
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            try {
                let then = x.then
                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (called) return called = true
                        resolutionProcedure(promise2, y, resolve, reject)
                    },e => {
                        if (called) return called = true
                        reject(e)
                    })
                } else {
                    resolve(x)
                }
            } catch (e) {
                if (called) return called = true
                reject(e)
            }
        } else {
            resolve(x)
        }
    }

    if (that.state === PENDING) {
        return (promise2 = new Promise((resolve, reject) => {
            that.resolvedCallbacks.push(() => {
                try {
                    const x = onFulfilled(that.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            
            that.rejectedCallbacks.push(() => {
                try {
                    const x = onRejected(that.value);     
                    resolutionProcedure(promise2, x, resolve, reject)               
                } catch (e) {
                    reject(e);
                }
            });
        }))
    }
    if (that.state === RESOLVED) {
        return (promise2 = new Promise((resolve, reject) => {
            that.resolvedCallbacks.push(() => {
                try {
                    const x = onFulfilled(that.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }));
    }
    if (that.state === REJECTED) {
        return (promise2 = new Promise((resolve, reject) => {
            that.resolvedCallbacks.push(() => {
                try {
                    const x = onRejected(that.value);
                    resolutionProcedure(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        }));
    }
};