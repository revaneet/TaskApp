const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname +'/tasks.db'
})

const Tasks = db.define('task',{
    id:{
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title:{
        type : Sequelize.STRING(),
        allowNull : false
    },
    desc:{
        type : Sequelize.TEXT,
        allowNull : true
    },
    dueDate:{
        type : Sequelize.DATEONLY,
        allowNull : false      
    },
    status:{
        type : Sequelize.ENUM('incomplete','completed'),
        defaultValue : 'incomplete'
    },
    priority:{
        type : Sequelize.ENUM('high','medium','low'),
        defaultValue : 'medium'
    },
    notes:{
        type : Sequelize.TEXT,
        allowNull : true
    }
})
module.exports={
    db , Tasks
}