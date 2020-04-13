const express = require('express')

const { db } = require('./db')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

db.sync()
  .then(() =>{
      app.listen(6543)
      console.log("server listening")
  })
  .catch((err) =>{
      console.error(err)
  })