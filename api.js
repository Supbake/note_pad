
const { UpdateDb } = require('./lib/notes');
const { v4: uuidv4 } = require('uuid');
const notes = require('./db/db.json');
const fs = require('fs')

module.exports = function (app) {
    // get from api/notes
    app.get('/api/notes', (req, res) => {
        // read the file
        fs.readFile("./db/db.json", function (err, data) {
            if (err) throw (err);
            const parsedJSON = JSON.parse(data)
            console.log('get api/notes', parsedJSON)
            // send response with parsed data
            res.send(parsedJSON)
        });

    });

    app.post('/api/notes', (req, res) => {
        // create array to put all the notes in
        const existingNotes = [];
        // create a new note
        const newNote = req.body;
        // give it an id
        newNote.id = uuidv4();

        // get all the notes 
        fs.readFile("./db/db.json", function (err, data) {
            // catch the error if one exists
            if (err) throw (err);

            // put them into an array with spread operater "..."
            existingNotes.push(...JSON.parse(data))

            // push the new note in with the rest of the notes
            existingNotes.push(newNote)
            console.log('existingNotes + newNote', existingNotes)
            // write over the existing file (or create new one) out of the array with all the notes
            fs.writeFile('./db/db.json', JSON.stringify(existingNotes), 'utf8', function (err) {
                // another opportunity for an error
                if (err) throw err;
            });
        });
        res.send('yeet');
    });

    app.delete('/notes:id', (req, res) => {
        let params = req.params.id;
        UpdateDb(params, notes);
        res.redirect('');
    });

}
