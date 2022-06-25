const express = require('express');
const router = express.Router();
const { getBooks, postBook, getBookById, updateBookById, deleteBookById } = require('../controllers/book.controller')


router.get('/', getBooks)
router.get('/:bookId', getBookById)
router.post('/', postBook)
router.put('/:bookId', updateBookById)
router.delete('/:bookId', deleteBookById)

module.exports = router;