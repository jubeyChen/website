// Selectors
const input = document.querySelector("#todoInput");
const btn = document.querySelector("#todoBtn");
const list = document.querySelector("#list");
const filterOption = document.querySelector(".filter-todo")

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
btn.addEventListener("click", addTodo);
list.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


// Function
function addTodo(e){
    // prevent form from submitting
    e.preventDefault();
    
    // todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText=input.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Add todo to localStorage
    saveLocalTodos(input.value);

    //Check Mark Btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML='<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash Btn
    const trashButton = document.createElement("button");
    trashButton.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to List
    list.appendChild(todoDiv);

    // Clear input value
    input.value="";
}

function deleteCheck(e){
    let item = e.target;

    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
    }

    //Check Mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = list.childNodes;
    todos.forEach(function(todo){
      switch(e.target.value){
        case "all":
            todo.style.display = "flex";
            break;
        
        case "completed":
           if(todo.classList.contains("completed")){
            todo.style.display = "flex";
           } else{
            todo.style.display = "none";
           }
           break;
        
        case "incomplete":
            if(!todo.classList.contains("completed")){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
               }
            break;   
      }
    });
}

function saveLocalTodos(todo){
    // check if anything here
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos=[];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos=[];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    // todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText= todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check Mark Btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML='<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash Btn
    const trashButton = document.createElement("button");
    trashButton.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to List
    list.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    // check if anything here
    let todos;
    if (localStorage.getItem("todos")=== null){
        todos=[];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
 