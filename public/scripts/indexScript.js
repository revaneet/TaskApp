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
function generateTaskHtml(task,index){
    return `
    <tr>
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.dueDate}</td>
    <tr>
    `
    
}


async function loadTasks(){
    
    var tasks = await getTasks()
    console.log(tasks)
    
    // let taskHtml = tasks.reduce ( (html,task,index) => html+=this.generateTaskHtml(task,index),'')
    let taskHtml =''
    // var index=0
    // for(let task in tasks)
    // {
    //     taskHtml += generateTaskHtml(task[index])
    //     index++
    // }
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        taskHtml += generateTaskHtml(task)
    }
    document.getElementById("table-body").innerHTML = taskHtml;
}

loadTasks()