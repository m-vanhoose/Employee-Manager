const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// const {
//     handleNoteView,
//     HandleNewNoteView,
// } = require('../public/assets/js/index');

router.get('/notes', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    res.send(JSON.parse(data));
    // handleNoteView()
});

router.get('/notes/:title', (req, res) => {
    console.log('notes/')
    const title = req.params.title;
    fs.readFile(path.join(__dirname, '../db/db.json'))
        .then((data) => JSON.parse(data))
})

router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newTitle = {
            title,
            text,
            id: uniqid()
        };
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            console.log(data)
            if (err) {
                console.error(err);
                return;
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newTitle);
                fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedData), err => {
                    if (err) {
                        console.error(err);
                    }
                    res.json(newTitle)
                })
            }
            
        })
    }
    console.log(req.body);
});

router.delete('/notes/:id', (req, res) => {
        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
            console.log(data)
            if (err) {
                console.error(err);
                return;
            } else {
                const parsedData = JSON.parse(data);
                const filteredNotes = parsedData.filter(note => note.id !== req.params.id)
                fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(filteredNotes), err => {
                    if (err) {
                        console.error(err);
                    }
                    res.json(filteredNotes)
                })
            }
            
        })
    console.log(req.body);
});

module.exports = router;