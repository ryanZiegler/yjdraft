const path = require('path');
const { Worker, isMainThread, parentPort, workerData, MessageChannel, threadId } = require('worker_threads');

// let code = `
// for(let i = 0;i < 5;i++) {
//     console.log('worker线程执行中:', i);
// }
// `
// let worker = new Worker(code, { eval: true });
// console.log('主线程执行完毕');

// const data = {
//     name: 'ego同学',
//     age: 23,
//     sex: 'male',
//     addr: '深圳南山',
//     arr: [{ skill: 'coding'}, { hobby: 'basketball' }]
// }
// const worker = new Worker(__filename, { workerData: data });

if (isMainThread) {
    const worker1 = new Worker(__filename);
    const worker2 = new Worker(__filename);
    // const worker2 = new Worker(path.join(__dirname, 'worker.js'), { workerData: worker1 });
    const { port1, port2 } = new MessageChannel();

    const sharedUint8Array = new Uint8Array(new SharedArrayBuffer(4));
    console.log(sharedUint8Array);
    worker1.postMessage({ uPort: port1, data: sharedUint8Array }, [ port1 ]);
    worker2.postMessage({ uPort: port2, data: sharedUint8Array }, [ port2 ]);


    // port2.once('message', (message) => {
    //     console.log('子线程说:', message);
    // }); 

    // worker.postMessage({name: 'ego同学'});
    worker2.once('message', (message) => {
        console.log(`${message}, 查看共享内存:${sharedUint8Array}`);
    });
} else {
    // workerData.age = 16;
    // workerData.arr[0].skill = 'sleep';
    // console.log(data);
    // console.log('子线程1', workerData);
    // parentPort.once('message', ({ port1 }) => {
    //     console.log('子线程1收到port1');
    //     // parentPort.postMessage(obj.name);
    //     port1.once('message', (msg) => {
    //         console.log('子线程1收到', msg);
    //     })

    //     port1.postMessage('port1 向 port2 发消息啦');
    //     // port1.close();
    // })

    parentPort.once('message', ({ uPort, data }) => {
        uPort.postMessage(`我是${threadId}号线程`);
        uPort.on('message', (msg) => {
            console.log(`${threadId}号收到:${msg}`);
            if (threadId === 2) {
                data[1] = 2;
                parentPort.postMessage('2号线程修改了共享内存!!!');
            }
            console.log(`${threadId}号查看共享内存:${data}`);
        })
    })
}