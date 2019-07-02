const path = require('path')
const express = require('express')
const app = express()
const pablicPath = path.join(__dirname,'..', 'public')
const port  = process.env.PORT || 3000

app.use(express.static(pablicPath))

app.get('*', (req, res) => {
    res.sendFile(path.join(pablicPath, 'index.html'))
})

app.listen(port, () => {
    console.log('Server run...')
})