const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Comment = require('../models/comment');

// GET users - get all users
router.get('/users', (req, res, next) => {
    User.find({}, 'username') // TODO try to remove 2nd arg 'username' and look for change in output
        .then((data) => res.json(data))
        .catch(next);
});

// GET user - get user by id
router.get('/users/:id', (req, res, next) => {
    const user = User.findById(req.params.id);
    if (user) {
        User.findById(req.params.id)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({ error: 'User not found' });
    }
});

// GET comments - get all comments
router.get('/comments', (req, res, next) => {
    Comment.find({})
        .then((data) => res.json(data))
        .catch(next);
});

// GET comment - get comment by id
router.get('/comments/:id', (req, res, next) => {
    const comment = Comment.findById(req.params.id);
    if (comment) {
        Comment.findById(req.params.id)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({ error: 'Comment not found' });
    }
});

// POST comment - add new comment
router.post('/comments', (req, res, next) => {
    if (req.body.content) {
        Comment.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({ error: 'Comment has no text' });
    }
});

// PUT comment - edit comment by id
router.put('/comments/:id', (req, res, next) => {
    const comment = Comment.findById(req.params.id);
    if (comment) {
        Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }) // 'new' option set to 'true' returns the modified document rather than the original
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({ error: 'Comment not found' });
    }
});

// DELETE comment - delete comment by id
router.delete('/comments/:id', (req, res, next) => {
    const comment = Comment.findById(req.params.id);
    if (comment) {
        Comment.findByIdAndDelete(req.params.id)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({ error: 'Comment not found' });
    }
});

module.exports = router;
