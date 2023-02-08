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
})