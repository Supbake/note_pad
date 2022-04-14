const router = require('express').Router();
const { createNewNote, UpdateDb } = require('../../lib/notes');
const { v4: uuidv4 } = require('uuid');
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results)
});

router.post('/notes', (req, res) => {
    let newNote = createNewNote(req.body, notes);
    req.body.id = uuidv4();
    res.json(newNote);
});

router.delete('/notes:id', (req, res) => {
    let params = req.params.id;
    UpdateDb(params, notes);
    res.redirect('');
})

module.exports = router;
