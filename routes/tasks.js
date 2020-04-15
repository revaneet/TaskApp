const { Router } = require('express')
const { Tasks } = require('../db')

const route = Router()

route.get('/',async(req , res) =>{
    const tasks = await Tasks.findAll()
    res.send(tasks)
})

route.get('/:id',async(req,res) =>{

    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'task id must be an integer',
        })
    }
    const task = await Tasks.findByPk(req.params.id)

    if (!task) {
        return res.status(404).send({
        error: 'No task found with id = ' + req.params.id,
        })
    }
    res.send(task)


})

route.post('/',async(req,res) =>{
    const newTask = await Tasks.create({
        title : req.body.title,
        desc : req.body.desc,
        dueDate : new Date(req.body.dueDate),
        status : req.body.status,
        priority : req.body.priority,       
    })
    res.status(201)
       .send({
           success : 'New task added',
           data : newTask
       })  
})

module.exports = route