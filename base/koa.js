class Koa {
    constructor() {
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    compose() {
        return async () => {
            function createNext(middleware, oldNext) {
                return async function() {
                    await middleware(oldNext);
                }
            }
            let len = this.middlewares.length
            let next = async function() {
                return Promise.resolve();
            }
            for (; len--;) {
                next = createNext(this.middlewares[len], next);
            }
            await next();
        }
    }
}

// Koa2源码分为四大模块
// application extend Event
//     listen app.listen => http.createServer(app.callback()).listen(...)
//     use 添加中间件,存储在middleware中,返回this,方便链式调用(判断是否generator组件,通过convert转化)
//     callback 合并中间件,创建请求上下文对象以及返回请求处理函数
//         compose 返回 handleRequest => app.createContext 创建请求上下文
//         koa-compose 组合所有中间件,通过Promise串联柯里化成单个中间件函数
// context 封装了request/response代理其方法/属性
//     onerror 清空响应头,抛出err给app实例
// Request
// Response

function compose(...funcs) {
    if (funcs.length ===0) {
        return arg => arg
    }
    if (funcs.length ===1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
const fn1 = function() {console.log(1)}
const fn2 = function() {console.log(2)}
const fn3 = function() {console.log(3)}
const res = compose(fn1, fn2, fn3);
console.log(res());