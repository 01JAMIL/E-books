const authorModel = require('../models/author.model');
const fs = require('fs');
const path = require('path')
const validateAuthor = require('../validation/author.validation')


const getAuthors = async (req, res) => {
    try {
        const authors = await authorModel.find();
        res.status(201).json(authors)
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

const getAuthorById = async (req, res) => {
    try {
        const author = await authorModel.findOne({ _id: req.params.authorId });
        res.status(201).json(author)
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

const postAuthor = async (req, res) => {
    const { errors, valid } = validateAuthor(req.body, req.file)
    try {
        if (!valid) {
            res.status(404).json(errors)
        } else {
            const author = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                image: req.file.filename,
                country: req.body.country,
                birthday: req.body.birthday
            }
            await authorModel.create(author)
            res.status(201).json(author)
        }
    } catch (err) {
        res.status(404).json({ message: 'Cannot add this Author' })
    }
}

const updateAuthorById = async (req, res) => {
    const { errors, valid } = validateAuthor(req.body, req.file)
    try {

        if (!valid) {
            res.status(404).json(errors)
        } else {
            const author = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                country: req.body.country,
                birthday: req.body.birthday
            }

            if (req.file !== undefined) {
                const authorById = await authorModel.findOne({ _id: req.params.authorId })
             
                fs.unlinkSync('uploads/' + authorById.image , function (err) {
                    if (err) throw err
                });
                
                author.image = req.file.filename
            }

            const updatedAuthor = await authorModel.findOneAndUpdate(
                { _id: req.params.authorId },
                author,
                { new: true }
            );
            res.status(201).json(updatedAuthor)
        }
    } catch (err) {
        res.status(404).json({ message: 'Something went wrong' })
    }
}

const deleteAuthorById = async (req, res) => {
    try {
        await authorModel.findOneAndRemove({ _id: req.params.authorId })
        res.status(201).json("Author deleted")
    } catch (err) {
        res.status(404).json({ message: 'Cannot delete this author' })
    }
}

module.exports = {
    getAuthors,
    getAuthorById,
    postAuthor,
    updateAuthorById,
    deleteAuthorById
}