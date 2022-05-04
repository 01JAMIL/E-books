const express = require('express');
const router = express.Router();
const { getBooks, postBook, getBookById, updateBookById, deleteBookById } = require('../controllers/book.controller')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null,'book' + Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

router.get('/', getBooks)
router.get('/:bookId', getBookById)
router.post('/', upload.single('image'), postBook)
router.put('/:bookId' ,upload.single('image'),updateBookById)
router.delete('/:bookId', deleteBookById)


module.exports = router;