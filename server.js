const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);
console.log("server listening on port: ", PORT);