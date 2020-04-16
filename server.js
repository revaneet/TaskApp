const express = require('express')

const taskRoute = require('./routes/tasks')
const { db } = require('./db')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/',express.static(__dirname + '/public') )
app.use('/tasks',taskRoute)

app.set('port',( process.env.PORT || 5000))
db.sync()
  .then(() =>{
      app.listen(app.get('port'))
      console.log("server listening")
  })
  .catch((err) =>{
      console.error(err)
  })