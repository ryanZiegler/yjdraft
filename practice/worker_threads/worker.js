const { isMainThread, parentPort, threadId } = require('worker_threads');

// console.log(workerData);

// parentPort.once('message', ({ port2 }) => {
//     console.log('子线程2收到port2');

//     port2.once('message', (msg) => {
//         console.log('子线程2收到', msg);
//     })

//     port2.postMessage('这里是port2, over!');
// })

if (isMainThread) {
    throw new Error('Its not a worker');
}
    
const doCalcs = (data) => {
    const collection = [];
    
    for (let i = 0; i < 10; i++) {
        collection[i] = Math.round(Math.random() * 1000);
    }
    
    return collection.sort((a, b) => { return a - b });
};
    
parentPort.on('message', (data) => {
    const result = doCalcs(data);
    // console.log(`线程${threadId}号排序完成`);
    parentPort.postMessage(result);
});