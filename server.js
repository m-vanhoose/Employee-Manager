const express = require('express');
const apiRoute = require('./routes/api');
const htmlRoute = require('./routes/html');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static('public'));

app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT,() => console.log(`listening on port ${PORT}`));
