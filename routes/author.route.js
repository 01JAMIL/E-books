const express = require('express')
const router = express.Router();
const multer = require('multer')
const { getAuthors, getAuthorById, postAuthor, updateAuthorById, deleteAuthorById } = require('../controllers/author.controller')

router.get('/', getAuthors)
router.get('/:authorId', getAuthorById)
router.post('/', postAuthor)
router.put('/:authorId', updateAuthorById)
router.delete('/:authorId', deleteAuthorById)

module.exports = router;