const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/notes', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    res.send(JSON.parse(data))
});

router.get('/notes/:title', (req, res) => {
    const title = req.params.title;
    readFromFile('../db/db.json')
        .then((data) => JSON.parse(data))
})

router.post('/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newTitle = {
            title,
            text
        };

        readAndAppend(newTitle, '../db/db.json');
        const response = {
            status: 'success',
            body: newTitle,
        };

        res.json(response);
    } else {
        res.json('Error')
    }

    console.log(req.body);
});
//readfile to get the current data
//parse old data to normal js object
//get new object from req.body
//push new object into old array
//fs.writefile to create new db.json file
//send new json array
module.exports = router;