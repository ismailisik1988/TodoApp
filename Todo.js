//Todo Ekleme İşlemleri

const todoInput=document.getElementById("todo");
const todoForm=document.getElementById("todo-form");
const listGroup=document.querySelector(".list-group");
const cardBody1=document.querySelectorAll(".card-body")[0];
const cardBody2=document.querySelectorAll(".card-body")[1];
const filterInput=document.getElementById("filter");
const clearButton=document.getElementById("clear-todos");


allEventMyProject();

function allEventMyProject(){
    todoForm.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",LoadPageTodos);
    cardBody2.addEventListener("click",removeTodo);
    filterInput.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearTodos);
}

function clearTodos(e){
    if(confirm("Tüm Todo'ları Silmek İstediğinizden Emin misiniz?")){
        const listGroupItemElement=document.querySelectorAll(".list-group-item"); 
        listGroupItemElement.forEach(function(element){
            element.remove();
        });
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    
    const listGroupItemElement=document.querySelectorAll(".list-group-item"); 
       
    listGroupItemElement.forEach(function(todo){
        const text=todo.textContent.toLowerCase();

        if(text.indexOf(filterValue)===-1){
            todo.style="display: none !important";
            console.log(todo);
        }
        else{
            todo.style="display: block";
        }
        console.log(todo.style);
    });
   
}

function removeTodo(e){

    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();        
        removeTodoStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning","Silme işlemi Başarıyla Gerçekleşti");
    }
    
}

function LoadPageTodos(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todos) {
        AddTodoList(todos);
    });
}
function haveTodo(e){
    const todos=getTodosFromStorage();
    const newTodo=todoInput.value;
    let Ok=false;
    
    todos.forEach(function(todo){
        if(newTodo.toLowerCase()===todo.toLowerCase()){      
            Ok= true;
        }     
    });
    return Ok;
}
function addTodo(e){
    const newTodo=todoInput.value;
    if(newTodo===""){
        showAlert("danger","Lütfen Todo Alanını Doldurunuz!!!");
    }
    else if(haveTodo()){
        console.log(newTodo.toLowerCase());
        showAlert("danger","Todo Zaten Mevcuttur!!!");
    }
    else{
        showAlert("success","Todo'nuz Başarı ile Eklenmiştir");
        AddTodoStorage(newTodo);
        AddTodoList(newTodo);
    } 
    e.preventDefault();
}

function removeTodoStorage(removeTodo){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
       if(removeTodo==todo){
        todos.splice(index,1);
       } 
    });
    localStorage.setItem("todos",JSON.stringify(todos));   
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function AddTodoStorage(newTodo){
    let todos=getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){
    const divElement=document.createElement("div");
    divElement.className=`alert alert-${type}`;
    divElement.role="alert";
    divElement.textContent=message;
    cardBody1.appendChild(divElement);
    setTimeout(function(){
        divElement.remove();
    },1500);
        
    
}

function AddTodoList(newTodo){
    
    
    const liElement=document.createElement("li");
    liElement.className="list-group-item d-flex justify-content-between";
    liElement.appendChild(document.createTextNode(newTodo));

    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class='fa fa-remove'></i>";
    liElement.appendChild(link);
    listGroup.appendChild(liElement);   

    todoInput.value="";
}

/*
<div class="alert alert-danger" role="alert">
  This is a danger alert—check it out!
</div>
*/