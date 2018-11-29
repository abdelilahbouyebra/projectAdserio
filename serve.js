var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 8081

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
