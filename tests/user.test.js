const request = require('supertest');
const app = require('../src/app')
const User = require('../src/models/user')
const {
    userOneId,
    userOne,
    setupDB
} = require('./fixtures/db')


beforeEach(setupDB)


test('Should signup a new user ', async () => {
    const response = await request(app).post('/users').send({
        "name": "User2",
        "email": "fox112@yandex.ru",
        "password": "1234567890"
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: "User2",
            email: "fox112@yandex.ru",
        },
        token: user.tokens[0].token
    })
})

test('Login user', async () => {
    const response = await request(app).post('/users/login').send(userOne).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Login nonexist', async () => {
    await request(app).post('/users/login').send({
        name: 'Mike',
        email: "mik1@mail.com",
        password: "1234567890"
    }).expect(400)
})

test('get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('not get profile for user unauth users', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('delete profile for user auth users', async () => {
    const res = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})


test('delete profile for user unauth users', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Upload avatar img', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('uploadFile', './tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user  = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('update valid user field', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        "name": "Jess",
        "password": "fvdagfvsrffgb"
    })
    .expect(200)

    const user  = await User.findById(userOneId)
    expect(user.name).toEqual("Jess")
})

test('not update invalid user field', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        "loal": "NY",
    })
    .expect(400)
})