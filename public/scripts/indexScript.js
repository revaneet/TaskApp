async function getTasks()
{
    const resp = await fetch('/tasks',{
        method : 'GET',
        headers :{
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }
    })
    const tasks = await resp.json()
    return tasks

}
async function postNewTask(theForm)
{
    let response = await fetch('/tasks',{
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json',
            'Accept': 'application/json'            
        },
        body : JSON.stringify({
            title : theForm.title.value,
            desc : theForm.desc.value,
            dueDate : theForm.dueDate.value,
            status : theForm.status.value,
            priority : theForm.priority.value 
        })
    })
    let result = response.json()
    if(result.ok)
    {
        alert("New Task added")
    }   
}
// function toggleTaskStatus(index){
//     this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
    
//     this.loadTasks();
// }
async function getSelectedTask(id)
{
    const resp = await fetch('/tasks/'+id,{
        method : 'GET',
        headers :{
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }
    })
    const task = await resp.json()
    return task

}
async function getNotesOfSelectedTask(id)
{
    const resp = await fetch('/tasks/'+id+'/notes',{
        method : 'GET',
        headers :{
            'Content-Type' : 'application/json',
            'Accept': 'application/json'
        }
    })
    const notes = await resp.json()
    return notes

}
async function postNewNote(id)
{
    var note = document.getElementById("input-"+id).value
    let response = await fetch('/tasks/'+id+'/notes',{
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json',
            'Accept': 'application/json'            
        },
        body : JSON.stringify({
            taskId : id,
            note : note,            
        })
    })
    let result = response.json()
    getNotesOfSelectedTask(id)

}
async function onTaskClick(id)
{
    var taskEle = document.getElementById("task-card-body-"+id)
    if(taskEle.style.display ==='none')
    {
        taskEle.style.display='block'
        var task = await getSelectedTask(id)
        console.log(task)
        var notes = await getNotesOfSelectedTask(id)
        console.log(notes)

        loadSelectedTask(task , notes)

    }
    else{
        taskEle.style.display='none'
        
        console.log("in else")
    }
    
}
async function generateAllTasksHtml(task){
    return `
    <div class="card bg-dark text-white" id="task-card-${task.id}">
        <div class="card-header" onclick="onTaskClick(${task.id})">
            <div class="row">
                <div class ="col-md-1" id="taskId">
                    ${task.id}

                </div>
                <div class ="col-md-7">
                    ${task.title}
                </div>
                <div class ="col-md-4">
                    ${task.dueDate}
                </div>
            </div>
        </div>
        <div class="card-body text-white " id="task-card-body-${task.id}" style="display: none;" >
            <div class="row" >
                <div class="card bg-light text-dark task" id="task-${task.id}">
                </div>
                <div class="card bg-light text-dark notes" id="notes-${task.id}">
                
                </div>
            </div>
        </div>
        
    </div>
    `    
}
async function generateTaskHtml(task)
{
    return ` 
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${task.desc}</li>
        <li class="list-group-item">${task.status}</li>
        <li class="list-group-item">${task.priority}</li>
        <li class="list-group-item">${task.dueDate}</li>
    </ul>

    `
}
async function generateNotesTemplate(id)
{
    return ` 
    <div class=" card-header input-group mb-3">
        <input type="text" class="form-control" placeholder="Compete it asap" id="input-${id}" >
        <div class="input-group-append">
            <button class="btn btn-primary" type="button" id="add-note-bt-${id}" onClick="postNewNote(${id})">Add Note</button>
        </div>
    </div>
    </div class="card-body">
        <ul class="list-group list-group-flush" id="ul-notes-${id}">
        </ul>
    </div>

    `
}
async function generateNotesHtml(note)
{
    return`
        <li class="list-group-item">${note.note}</li>
    `

}
async function loadSelectedTask(task,notes)
{
    let taskHtml = ''
    taskHtml += await generateTaskHtml(task)
    document.getElementById("task-"+task.id).innerHTML = taskHtml
    taskHtml = ''
    taskHtml += await generateNotesTemplate(task.id)
    document.getElementById("notes-"+task.id).innerHTML = taskHtml
    taskHtml = ''
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i]
        taskHtml += await generateNotesHtml(note)
    }
    document.getElementById("ul-notes-"+task.id).innerHTML = taskHtml
}
async function loadTasks(){
    
    var tasks = await getTasks()
    console.log(tasks)
    
    // let taskHtml = tasks.reduce ( (html,task,index) => html+=this.generateTaskHtml(task,index),'')
    let taskHtml =''   
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i]
        taskHtml += await generateAllTasksHtml(task)
    }
    document.getElementById("all-tasks-card-body").innerHTML = taskHtml
}

loadTasks()