let TaskSystem = {
    runTask(taskname){
        const found = this._tasks.find(element => {
            return element.taskname === taskname
        })
        let result = found.task()
        if(result instanceof Error){
            return result
        }
    },
    addTask(taskname, task){
        let count = this._tasks.push({taskname: taskname, task: task})
        this.tasksCount = count + 1
    },
    _tasks: [],
    tasksCount: undefined,
}

export default TaskSystem