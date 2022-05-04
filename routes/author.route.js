const express = require('express')
const router = express.Router();
const multer = require('multer')
const { getAuthors, getAuthorById, postAuthor, updateAuthorById, deleteAuthorById } = require('../controllers/author.controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, 'author' + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.get('/', getAuthors)
router.get('/:authorId', getAuthorById)
router.post('/', upload.single('image'), postAuthor)
router.put('/:authorId', upload.single('image'), updateAuthorById)
router.delete('/:authorId', deleteAuthorById)

module.exports = router;