document.addEventListener('DOMContentLoaded',()=>{
    const todoInput=document.getElementById("todo-input")
const addTaskButtton=document.getElementById("add-task-btn")
const todoList=document.getElementById("todo-list")

let tasks=JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(element => {
    renderTask(element);
});
addTaskButtton.addEventListener('click',()=>{
    const taskText=todoInput.value.trim();
    if(taskText==="")return;

    const newTask={
        id: Date.now(),
        text:taskText,
        completed:false
    }
    
    tasks.push(newTask)
    saveTasks();
    renderTask(newTask)
todoInput.value='' //clears input 


});
//read from the local storage
function renderTask(task){
 const li =document.createElement('li');
 li.setAttribute("data-id",task.id);
 if(task.completed){
    {
        li.classList.add("completed")
    }
 }
 li.innerHTML=`<span>${task.text}</span>
 <button>delete</button>`;
 li.addEventListener("click",(e)=>{
    if(e.target.tagName === 'BUTTON')return;
    else{
        task.completed=!task.completed
        li.classList.toggle('completed')
        saveTasks();
    }
 })
 li.querySelector("button").addEventListener("click",(e)=>{
    e.stopPropagation() //double div bhitra div nih click hunxa type //prevent toggle
    tasks = tasks.filter(t=>t.id!==task.id)
    li.remove()
    saveTasks();

 })
 
 todoList.appendChild(li);
}


//from array to local storage
function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));

} 
})
