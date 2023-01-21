/**
 * task system for handling tasks (functions)
 */
const TaskSystem = class {
    constructor(){
        this._tasks = []
        this.tasksCount = 0
    }
    /**
     * run a previously registered task
     * @param {String} taskname 
     * @returns {Error | void}
     */
    run(taskname){
        const found = this._tasks.find(element => {
            return element.taskname === taskname
        })
        let result = found.task()
        if(result instanceof Error){
            return result
        }
    }
    /**
     * register new task
     * @param {String | Function} taskname 
     * @param {Function | undefined} task 
     */
    register(taskname, task){
        //hacky jankencode incoming... if there is no task, assume first argument is the task
        if(!task){
            task = taskname
            taskname = task.name //function name
        }
        let count = this._tasks.push({taskname: taskname, task: task})
        this.tasksCount = count + 1
    }
}

const tasksys = new TaskSystem

export default tasksys