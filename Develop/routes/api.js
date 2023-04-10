const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/notes', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    res.send(JSON.parse(data))
})

//readfile to get the current data
//parse old data to normal js object
//get new object from req.body
//push new oibject into old array
//fs.writefile to create new db.json file
//send new json array
module.exports = router;