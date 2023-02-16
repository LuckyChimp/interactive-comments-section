const express = require('express');
const router = express.Router();
const { getComments, getComment, createComment, updateComment, deleteComment } = require('../controllers/commentController');

router.route('/').get(getComments).post(createComment);
router.route('/:id').get(getComment).put(updateComment).delete(deleteComment);

module.exports = router;