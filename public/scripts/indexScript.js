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
    alert(result.success)    
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
async function onTaskClick(id)
{
    var task = await getSelectedTask(id)
    console.log(task)
    var notes = await getNotesOfSelectedTask(id)
    
}
function generateTaskHtml(task){
    return `
    <div class="card text-white" id="task-card">
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
        
    </div>
    `    
}
async function loadTasks(){
    
    var tasks = await getTasks()
    console.log(tasks)
    
    // let taskHtml = tasks.reduce ( (html,task,index) => html+=this.generateTaskHtml(task,index),'')
    let taskHtml =''   
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        taskHtml += generateTaskHtml(task)
    }
    document.getElementById("all-tasks-card-body").innerHTML = taskHtml;
}

loadTasks()