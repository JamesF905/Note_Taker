const express = require('express');
const fs = require('fs');
const path = require('path');
const noteId = require('uniqid');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
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

app.post('/api/notes', (req, res) =>{
// grab the new title and text from the request body
const { title, text} = req.body;
// make a new object with the new title and text
const newNote = { title, text, id: noteId()};

fs.readFile('./db/db.json', 'utf8', (err, data) => {
    // read the db/db.json file and set it as a variable
    const readNotes = JSON.parse(data);
    // add the new file to the old file vaiable
    readNotes.push(newNote)
    //write the updated file to the db folder
    fs.writeFile('./db/db.json', JSON.stringify(readNotes, null, 2), (err) =>
        err ? console.error(err) : console.info('Notes Updated!')
    );
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

});


app.delete('/api/notes/:id', (req, res) => {
    
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            const note_list = JSON.parse(data);
            for(i=0;i<note_list;i++){

            }
        }
    });
    
});

app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);