const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

function createNewNote(body, notesArr) {
    const note = body;
    notesArr.push(note);
    fs.writeFileSync(
        path.join(__dirname, 'db/db.json'),
        JSON.stringify({ notes: notesArr }, null, 2)
    );
    return note;
}
    
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
  });

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length;
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);    
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });