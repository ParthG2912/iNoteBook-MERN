const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//ROUTE 1: Get all Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, errors: "Internal server error" });
    }
});

//ROUTE 2: Add a Note using: POST "/api/notes/addnote". Login required
router.post(
    "/addnote",
    fetchuser,
    [body("title", "Enter a valid title").isLength({ min: 3 }), body("description", "Description must be atleast 5 characters").isLength({ min: 5 })],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // if there are errors, return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const note = new Note({ title, description, tag, user: req.user.id });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, errors: "Internal server error" });
        }
    }
);

//ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //Create a newNote object
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ success: false, errors: "Not Found!!!" });
        //Check if user owns this note
        if (note.user.toString() !== req.user.id) return res.status(401).json({ success: false, errors: "Not Allowed" });

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, errors: "Internal server error" });
    }
});

//ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ success: false, errors: "Not Found!!!" });
        //Check if user owns this note
        if (note.user.toString() !== req.user.id) return res.status(401).json({ success: false, errors: "Not Allowed" });

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note has been Deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, errors: "Internal server error" });
    }
});

module.exports = router;
