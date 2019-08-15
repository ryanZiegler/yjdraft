class Router {
    constructor(routes) {
        this.routes = routes || {};
        this.currentUrl = null;
    }

    route(path, callback) {
        this.routes[path] = callback || function() {};
    }

    refresh() {
        this.currentUrl = location.hash.slice(1) || '/';
        this.routes[this.currentUrl]();
    }

    init() {
        window.addEventListener('load', this.refresh.bind(this), false);
        window.addEventListener('hushchange', this.refresh.bind(this), false);
    }
}

window.Router = new Router();
window.Router.init();