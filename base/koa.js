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

