const fs = require('fs');
const path = require('path');

function UpdateDb(id, notesArray) {
    const deletedNotes = id;
    for (let i = 0; i < notesArray.length; i++) {
        if (deletedNotes === notesArray[i].id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notesArray, null, 2), err => {
                if (err) {
                    throw err;
                }
            });
        }
    }
}


module.exports = {
    UpdateDb
};