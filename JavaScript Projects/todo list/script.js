
let button = document.getElementById('add')
let todoList = document.getElementById('todoList')
let input = document.getElementById('input')
// Local storage -->  retaining the elements after closing the window
let todos = [];                        // create empty array to add the values in input box
window.onload = ()=>{  // while reload the page
  todos = JSON.parse(localStorage.getItem('todos')) || []  // get the local storage value 
  todos.forEach(todo => addtodo(todo))
 }

button.addEventListener('click',()=>{
    todos.push(input.value)          // add the entered element in todos array
    // console.log(todos)
    localStorage.setItem('todos',JSON.stringify(todos))  // only storing the todos array element by converting into string
    addtodo(input.value)            // call the addtodo func.
    input.value = ''               // clearing input box
})
function addtodo(todo){             // display the elements down the input box
    let para = document.createElement('p')   // create <p> tag
    para.innerHTML = todo          // added value is todo
    todoList.appendChild(para) 
    para.addEventListener('click',()=>{  // for single click 
        para.style.textDecoration = 'line-through' //strike the single clicked element
        remove(todo)   // and also remove the striked element
    })
    para.addEventListener('dblclick',()=>{   // for double click
        todoList.removeChild(para)   // removes the double clicked element
        remove(todo)
    })
}

function remove(todo){
    let index = todos.indexOf(todo)  // find the index of clicked element
    if(index>-1){
      todos.splice(index,1)        // delete by using the index value and 1 is to delete one element
    }
    localStorage.setItem('todos',JSON.stringify(todos))      
}
