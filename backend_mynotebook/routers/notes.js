const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Notes = require('../models/Notes');
const User = require('../models/User');

// ====== ROUTES ======
// CRUD stand for create, read, update and delete or destory


// This is read route
// Fetch all user notes || api is: http://localhost:5000/notes/allnotes
router.get('/allnotes', fetchuser, async(req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
});

// This is create route
// Add a note || api is: http://localhost:5000/notes/addnote
router.post('/addnote', fetchuser, body('title', 'Title must be atleast 3 character.').isLength({ min: 3 }),
    body('description', 'Description has at lest 5 char').isLength({ min: 5 }),
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // res.status(400) is used for bad request
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, description, tag } = req.body;
            Notes.create({ title: title, description: description, tag: tag, user: req.user.id }, (error, note) => {
                if (error) {
                    console.log(error.message);
                    res.json({ error: "something wrong heppned" });
                } else
                    res.json({ note });
            });
        } catch (error) {
            console.error(error.message);
            res.send({ error: "Internal error occured" });
        }
    });

// This is a update route
// Authenticate user by fetchuser and than by same auth who hase message can delete it
// api is: http://localhost:5000/notes/update/id
router.put('/update/:id', fetchuser, async(req, res) => {
    const { title, description, tag } = req.body;
    const newnode = {};
    if (title && title.length <= 3 || (description && description.length <= 5)) {
        return res.status(400).json({ error: "Title must have atleast 3 char and Desription must have atleast 5 char." });
    }
    try {
        if (title) { newnode.title = title };
        if (description) { newnode.description = description };
        if (tag) { newnode.tag = tag };
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note is does not exits" });
        }
        // Verify the owner of note is equal to authenticated user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Note Allowed." });
        }
        const updatednote = await Notes.findByIdAndUpdate(req.params.id, { $set: newnode }, { new: true });
        return res.json({ updatednote });
    } catch (error) {
        console.error(error.message);
        res.send({ error: "Internal error occured" });
    }
});


// This is a delete route
// To delete a note.
router.delete('/delete/:id', fetchuser, async(req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Not Found" });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not Allowed..." });
        }
        const deletednode = await Notes.findByIdAndDelete(req.params.id);
        return res.json({ deletednode });
    } catch (error) {
        console.error(error.message);
        res.send({ error: "Internal error occured" });
    }
});

module.exports = router;