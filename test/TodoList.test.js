const { assert } = require("chai")
const { isTopic } = require("web3/lib/utils/utils")

const ToDoList = artifacts.require('./ToDoList.sol')

contract('ToDoList', (accounts) => {
    before(async () => {
        this.todoList = await ToDoList.deployed()
    })

    it('deployed successfully', async () => {
        const address = await this.todoList.address
        assert.notEqual(address, 0x0) // address not equal to zero address
        assert.notEqual(address, '') // address not equal to an empty string
        assert.notEqual(address, null) // address not equal to  null
        assert.notEqual(address, undefined) // address not equal to undefined
    })

    it('lists tasks', async () => {
        const taskCount = await this.todoList.taskCount() // pull the task count
        const task = await this.todoList.tasks(taskCount) // ensure a task exists
        assert.equal(task.id.toNumber(), taskCount.toNumber())
        assert.equal(task.content, 'Check out https://www.web3securitydao.xyz/')
        assert.equal(task.completed, false)
        assert.equal(taskCount.toNumber(), 1)
    })

    it('creates tasks', async () => {
        const result = await this.todoList.createTask('A new task')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount, 2)
        // console.log(result)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'A new task')
        assert.equal(event.completed, false)

    })

    it('toggles tasks completed', async () => {
        const result = await this.todoList.toggleCompleted(1)
        const task = await this.todoList.tasks(1)
        assert.equal(task.completed, true)
        // console.log(result)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), 1)
        assert.equal(event.completed, true)

    })
})