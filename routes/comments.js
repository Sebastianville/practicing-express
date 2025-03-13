//!step 1
const express = require('express')
const router = express.Router()

//TODO optional step 1.5
const comments = require('../data/comments')

//! Step 4
router 
    .route('/')
    .get((req, res) => {
        res.json (comments)
    })

    //!Step 5
    .post((req, res) => {
        // Check for required fields
        if(req.body.userID && req.body.body && req.body.postId) {
            //! Check if username already exists
            // if(comments.find((comment) => comment.userID == req.body.userID)) {
            //     res.json({error: 'username already exists'})
            //     return;
            // }
            
            // Create and save new comment
            const comment = {
                id: comments[comments.length- 1].id + 1,
                userID: req.body.userId,
                postId: req.body.postId,
                body: req.body.body,
    
            }
            comments.push(comment)
            res.json(comment)
        } else {
            // Handle insufficient data case
            res.json({error: 'insufficient Data'})
        }
    })

router
    .route('/:commentID')
    .get((req, res) => {
        const comment = comments.find(comment => comment.id == req.params.commentID)
        res.json(comment)
    })

    .patch((req, res) => {
        const comment = comments.find((comment, i) => {
            if (comment.id == req.params.commentID) {
                for (const key in req.body) {
                    comments[i][keys] = req.body[key]
                }
                return true 
            }
        })
        if (comment) {
            res.json(comment)
        } else{
            res.status(404).send("comment not found")
        }
    })

    .delete((req, res) => {
        const comment = comments.find((comment, i) => {
            if(comment.id == req.params.commentID) {
                comments.splice(i, 1)
                return true
            }
        })
        if(comment) {
            res.json(comment)
        } else {
            res.status(404).send('Comment not found')
        }
    })


//TODO step 1.75- if you want to export it before anything 
module.exports = router 