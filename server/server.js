const path = require('path')
const express = require('express')
const app = express()
const pablicPath = path.join(__dirname,'../', './public')
const port  = process.env.PORT || 3000
const fetch = require('node-fetch');
const bodyParser = require("body-parser");

app.use(express.static(pablicPath))

app.use(bodyParser.urlencoded({
    extended: true
}));

  app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(pablicPath, 'index.html'))
})

app.post("/callback", function (request, response) {
    if(!request.body) return response.sendStatus(400);

    fetch(`http://77.222.152.121:88/call.php?key=tTBSNAmh5EJ6GqCLyz2uDEpzqQ&phone=${request.body.phone}`)
    .then(res => res.text())
    .then(body => response.send(body));
});

app.listen(port, () => {
    console.log('Server run...'+port);
})