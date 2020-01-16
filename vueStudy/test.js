new Vue({
    el: '#a',
    data() {
        return {
            name: 'test'
        }
    },
    methods: {
        getName() {
            this.name = '父组件app';
        }
    }
})