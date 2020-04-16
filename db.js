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
        type : Sequelize.STRING,
        allowNull : false
    },
    desc:{
        type : Sequelize.TEXT,
        defaultValue : "None",
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
})

const Notes = db.define('note' , {
    id:{
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    taskId:{
        type : Sequelize.INTEGER,
        allowNull : false
    },
    note:{
        type : Sequelize.TEXT,
        allowNull : false
    }

})
module.exports={
    db , Tasks , Notes
}