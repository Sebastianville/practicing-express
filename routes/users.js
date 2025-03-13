const express = require('express')
const router = express.Router()
const users = require('../data/users')

router
    .route('/')
    .get((req, res) => {
        res.json(users)
    })
    .post((req, res) => {
        if (req.body.name && req.body.username && req.body.email) {
            if (users.find((user) => user.username == req.body.username)) {
                res.json({ error: 'username already exits' })
                return;
            }

        }
        const user = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
        }
        users.push(user)
        //we want the user  to see the change so which is why we are going the following line:
        res.json(users[users.length - 1])
    })

router
    .route('/:usersID')
    .get((req, res) => {
        //res.send(`User ID: ${req.params.usersID}`)
        const user = users.find((user) => user.id == req.params.usersID)
        if (user) { res.json(user) }
        else { res.status(404).send("User not found") }
    })
    .patch((req, res, next) => {
        const user = users.find((user, i) => {
            if (user.id == req.params.usersID) {
                for (const key in req.body) {
                    users[i][key] = req.body[key]
                }
                return true
            }

        })
        if (user) {
            res.json(user)
        }
        else {
            // next()
            res.status(404).send('User not found')
        }
    })
    .delete((req, res, next) => {
        const user = users.find((user, i) => {
            if (user.id == req.params.usersID) {
                users.splice(i, 1)
                return true
            }
        })
        if (user) res.json(user)
        else {
            //  next()
            res.status(404).send('User not found')
        }
    })

module.exports = router; 