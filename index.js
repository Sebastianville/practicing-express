const express = require('express');
const bodyParser = require('body-parser')

const users = require('./routes/users')
const posts = require('./routes/posts')
//!step 2
const comments = require('./routes/comments')

const app = express();
const PORT = 3000

//Adding the body parses as middlewear in order to parse the data 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))



app.use((req, res, next) => {
    const time = new Date()
    console.log(`request made at ${time.toLocaleDateString()}`);
    console.log(`Request type: ${req.method} send to: ${req.url}`);
    next()
    
})

app.use('/users', users)
app.use('/posts', posts)

//!step 3
app.use('/comments', comments)


app.get('/', (req, res) => {
    res.send('Base home page')
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})