const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3000

//Adding the body parses as middlewear in order to parse the data 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

const users = require('./data/users')
const posts = require('./data/posts')




app.get('/', (req, res) => {
    res.send('Base home page')
})

app
    .route('/users')
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


app.get('/posts', (req, res) => {
    res.json(posts)
})

app.get('/users/:usersID', (req, res) => {
    // res.send(`User ID: ${req.params.usersID}`)
    const user = users.find((u) => u.id == req.params.usersID)
    if (user) { res.json(user) }
    else {
        res.status(404).send(`User ${req.params.usersID} not found`)
    }
})

app.get('/posts/:postsID', (req, res) => {
    const post = posts.find((post) => post.id == req.params.postsID)
    if (post) { res.json(post) }
    else {
        res.status(404).send(`post ${req.params.postsID} not found`)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})