var express = require('express')
var mongoose = require('mongoose')
var app = express()

var PORT = process.env.PORT || 3000

app.use(express.static("public"))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

var apiroutes = require("./routes/apiroutes")
var htmlroutes = require("./routes/htmlroutes")
apiroutes(app)
htmlroutes(app)

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_db")

app.listen(PORT, function(){
    console.log("now listening on http://localhost:" + PORT)
})

