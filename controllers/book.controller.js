const bookModel = require('../models/book.model');
const fs = require('fs');
const path = require('path');
const validateBook = require('../validation/book.validation')

const getBooks = async (req, res) => {
    try {
        const books = await bookModel.find();
        res.status(201).json(books);
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await bookModel.findOne({ _id: req.params.bookId })
        if (book !== null) {
            res.status(201).json(book);
        } else {
            res.status(201).json({ message: 'Book not found' });
        }
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

const postBook = async (req, res) => {
    const { errors, valid } = validateBook(req.body, req.files)
    try {
        if (!valid) {
            res.status(404).json(errors)
        } else {

            const bookImageName = 'book' + Date.now() + '-' + req.files.image.name
            const bookPdfName = 'book' + Date.now() + '-' + req.files.pdf.name

            req.files.image.mv('./uploads/' + bookImageName)
            req.files.pdf.mv('./uploads/' + bookPdfName)


            const bookObj = {
                title: req.body.title,
                country: req.body.country,
                image: bookImageName,
                pdf: bookPdfName,
                language: req.body.language,
                pages: req.body.pages,
                year: req.body.year,
                author: req.body.author
            }
            await bookModel.create(bookObj)
            res.status(201).json(bookObj)
        }
    } catch (err) {
        res.status(404).json({ message: 'Cannot add this book' })
    }
}

const updateBookById = async (req, res) => {
    const { errors, valid } = validateBook(req.body, req.file)
    try {
        if (!valid) {
            res.status(404).json(errors)
        } else {
            const bookObj = {
                title: req.body.title,
                country: req.body.country,
                language: req.body.language,
                pages: req.body.pages,
                year: req.body.year,
                author: req.body.author
            }

            if (req.file !== undefined) {

                const bookById = await bookModel.findOne({ _id: req.params.bookId })

                fs.unlinkSync('uploads/' + bookById.image, function (err) {
                    if (err) throw err
                });

                bookObj.image = req.file.filename
            }

            const updatedBook = await bookModel.findOneAndUpdate(
                { _id: req.params.bookId },
                bookObj,
                { new: true }
            )
            res.status(201).json(updatedBook)
        }
    } catch (err) {
        res.status(404).json({ message: 'Cannot update this book' })
    }
}


const deleteBookById = async (req, res) => {
    try {
        await bookModel.findOneAndRemove({ _id: req.params.bookId })
        res.status(201).json("Book deleted")
    } catch (err) {
        res.status(404).json({ message: 'Cannot delete this book' })
    }
}

module.exports = {
    getBooks,
    getBookById,
    postBook,
    updateBookById,
    deleteBookById
}