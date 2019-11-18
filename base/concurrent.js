class Concurrently {
    constructor(taskLimit) {
        if (taskLimit < 0) {
            throw new Error('Limit cant be lower than 0');
        }
        this.tasksQueue = [];
        this.taskLimit = taskLimit;
        this.tasksActiveAmount = 0;
    }

    registerTask(handler) {
        this.tasksQueue = [...this.tasksQueue, handler];
        this.executeTasks();
    }

    executeTasks() {
        while (this.tasksQueue.length && this.tasksActiveAmount < this.taskLimit) {
            const task = this.tasksQueue[0];
            this.tasksQueue = this.tasksQueue.slice(1);
            this.tasksActiveAmount += 1;

            task().then((result) => {
                this.tasksActiveAmount -= 1;
                this.executeTasks();

                return result;
            }).catch((err) => {
                this.tasksActiveAmount -= 1;
                this.executeTasks();

                throw err;
            });
        }
    }

    task(handler) {
        return new Promise((resolve, reject) => {
            this.registerTask(() => handler().then(resolve).catch(reject))
        });
    }
}

export default Concurrently;