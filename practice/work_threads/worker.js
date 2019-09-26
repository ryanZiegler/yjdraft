const { parentPort, workerData } = require('worker_threads');

console.log(workerData);

parentPort.once('message', ({ port2 }) => {
    console.log('子线程2收到port2');

    port2.once('message', (msg) => {
        console.log('子线程2收到', msg);
    })

    port2.postMessage('这里是port2, over!');
})