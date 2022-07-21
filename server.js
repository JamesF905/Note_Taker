const express = require('express');
const fs = require('fs');
const db_data = require('./db/db.json');

const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});
//app.get('/api/notes', (req, res) => res.json([db_data]));

app.post('/api/notes', (req, res) =>{
// grab the new title and text from the request body
const { title, text } = req.body;
// make a new object with the new title and text
newNote = { title, text };

/*
fs.appendFile('./db/db.json', newNote, (err) =>
  err ? console.error(err) : console.log('Notes Updated!')
);*/

fs.readFile('./db/db.json', 'utf8', (err, data) => {
    // read the db/db.json file and set it as a variable
    const readNotes = JSON.parse(data);
    // add the new file to the old file vaiable
    readNotes.push(newNote)
    //write the updated file to the db folder
    fs.writeFile('./db/db.json', JSON.stringify(readNotes, null, 2), (err) =>
        err ? console.error(err) : console.info('Notes Updated!')
    );
})

});

app.delete('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'db/db.json'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);