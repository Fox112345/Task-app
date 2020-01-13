const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        const token = await user.genAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e.message)
    }

})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.genAuthToken();
        
        res.send({user, token})


    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save();
        res.send();

    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save();
        res.send();

    }catch(e){
        res.status(500).send()
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id);
//         if (!user) return res.status(404).send()
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }

// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValiidOperstion = updates.every((update) => allowedUpdates.includes(update))

    if (!isValiidOperstion) return res.status(400).send({
        error: "Invalid update"
    })

    try {
        const user = req.user;

        updates.forEach( update => user[update] = req.body[update])

        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // });
        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {

    try {
        // const user = await User.findByIdAndRemove(req.user._id)
        // if (!user) return res.status(404).send()
        // 

        await req.user.remove()
        res.send(req.user)

    } catch (e) {

        res.status(500).send()

    }
})

module.exports = router