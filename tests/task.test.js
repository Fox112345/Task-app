const request = require('supertest');
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    userOneId,
    userOne,
    setupDB,
    taskOne,
    userTwo
} = require('./fixtures/db')


beforeEach(setupDB)


test('Create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            descr: "test"
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.done).toEqual(false)
})

test('Tasks length', async () => {
    const res = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(res.body.length).toBe(2)
})

test('Delete unauth user tasks ', async () => {
    const res = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull
})