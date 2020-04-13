const { Router } = require('express')
const { Tasks } = require('../db')

const route = Router()

route.get('/',async(req , res) =>{
    const tasks = await Tasks.findAll()
    res.send(tasks)
})

route.post('/',async(req,res) =>{
    const newTask = await Tasks.create({
        title : req.body.title,
        desc : req.body.desc,
        dueDate : new Date(req.body.dueDate),
        status : req.body.status,
        priority : req.body.priority,
        notes : req.body.notes,
    })
    res.status(201)
       .send({
           success : 'New task added',
           data : newTask
       })


})
module.exports = route