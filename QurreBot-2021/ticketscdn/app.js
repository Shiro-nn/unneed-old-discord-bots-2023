const express = require('express');
const path = require('path');
const config = require('./config');
app = express();
app.use(express.static(path.join(__dirname, '/data')));
app.use(function(req, res){
    if(config.last) return res.status(404).sendFile(path.join(__dirname, '/404.html'));
    res.redirect(`${config.safe}://tickets${config.id+1}-${config.host}${req.originalUrl}`);
});
app.listen(80);
app.listen(443);