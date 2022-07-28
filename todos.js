// Selectors

const body = document.querySelector("#body")
const ulEl = document.querySelector("#ul-el")
const inputField = document.querySelector(".todo-input-element")
const saveButton = document.querySelector("#todo-save-button")
const modeButton = document.querySelector("#mode-changer-button")
const header = document.querySelector("#header")
const completedTasks = document.querySelector("#number-of-completed-tasks")
const authorNameArray = JSON.parse(localStorage.getItem("namesOfAuthors"))
const comp = document.querySelector("#completed-tasks")
const todosHeading = document.querySelector("#todos-heading")
let authorName2 = document.querySelector(".author-name")
let authorName

checkNumberOfCompletedTasks()


if (authorNameArray !== null) {
    authorName = authorNameArray[0]
}
else {
    authorName = "Device"
    const tempAuthorNameArray = ["Device"]

    localStorage.setItem("namesOfAuthors", JSON.stringify(tempAuthorNameArray))
}

// Event Listeners

document.addEventListener("DOMContentLoaded", getTodos)
saveButton.addEventListener("click", addTodo)
ulEl.addEventListener("click", deleteCheck)
header.addEventListener("click", editAuthorName)

// Function Calls

createHeader(authorName)

// Functions

function checkTasks() {

    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos.length === 0) {
        todosHeading.textContent = "You are all set!"
    }
    else {
        todosHeading.textContent = "Tasks"
    }

}

function formMode() {

    // Light Mode

    if (mode === "light") {

        inputField.classList.toggle("dark-todo-input-element")

    }

    // Dark Mode

    else {

        inputField.classList.toggle("todo-input-element")

    }

}

function createHeader(nameOfAuthor) {

    // Main Div


    const displayDiv = document.createElement("div")
    displayDiv.classList.add("display-div")

    // Text (Name)

    const displayName = document.createElement("h1")
    displayName.classList.add("heading")


    if (nameOfAuthor !== "") {
        displayName.innerText = `${nameOfAuthor}'s Tasks`
    }
    else{
        displayName.innerText = `My Tasks`
    }
    
    displayDiv.appendChild(displayName)

    header.appendChild(displayDiv)

}


function editAuthorName(event) {
    const item = event.target

    if(item.classList[0] === "author-name") {
        
        // Create selectors

        const authorNameElement = document.querySelector(".author-name")
        const displayDiv = document.querySelector(".display-div")

        // Replace h1 with input field

        const headerInputField = document.createElement("input")
        headerInputField.classList.add("header-input-field")
        headerInputField.setAttribute("autofocus", "autofocus")
        headerInputField.setAttribute("placeholder", "Enter Your Name")

        displayDiv.replaceChild(headerInputField, authorNameElement)

        headerInputField.focus()

        headerInputField.onblur = () => {

            // Update name in local storage  

            if (headerInputField.value === "") {
                displayDiv.replaceChild(authorNameElement, headerInputField)
            }

            else {

                let nameArray = JSON.parse(localStorage.getItem("namesOfAuthors"))
            
                nameArray.pop()
                nameArray.push(headerInputField.value)
                
                localStorage.setItem("namesOfAuthors", JSON.stringify(nameArray))

                // Remove input field and add h1 tag

                nameArray = JSON.parse(localStorage.getItem("namesOfAuthors"))
                const authorName = nameArray[0]

                const dispName = document.createElement("h1")
                dispName.classList.add("author-name")
                dispName.innerText = `${authorName}'s Tasks`
                
                displayDiv.replaceChild(dispName, headerInputField)
            }
        }

            // Event listener when ENTER key clicked

        headerInputField.addEventListener("keypress", (e) => {

            if (e.key === "Enter") {
            
                // Update name in local storage  

                if (headerInputField.value === "") {
                    displayDiv.replaceChild(authorNameElement, headerInputField)
                }
    
                else {
    
                    let nameArray = JSON.parse(localStorage.getItem("namesOfAuthors"))
                
                    nameArray.pop()
                    nameArray.push(headerInputField.value)
                    
                    localStorage.setItem("namesOfAuthors", JSON.stringify(nameArray))
    
                    // Remove input field and add h1 tag
    
                    nameArray = JSON.parse(localStorage.getItem("namesOfAuthors"))
                    const authorName = nameArray[0]

                    const dispName = document.createElement("h1")
                    dispName.classList.add("author-name")
                    dispName.innerText = `${authorName}'s Tasks`
                    
                    displayDiv.replaceChild(dispName, headerInputField)
                }
            }
        })
    }
}


function addTodo(event) {
    
    event.preventDefault()
    
    // Render the div which would contain the following: 
        // Render the li
        // Render the done button
        // Render the delete button

    // Div

    if (inputField.value === "") {
    }
    else {

        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        // Li

        const newTodo = document.createElement("li")
        newTodo.classList.add("todo-item")
        newTodo.innerText = inputField.value
        todoDiv.appendChild(newTodo)
        // ADD todo to local storage
        saveLocalTodos(inputField.value)

        // Done Button

        const doneButton = document.createElement("button")
        doneButton.innerHTML = "<i class='fa-regular fa-square'></i>"
        doneButton.classList.add("done-button")
        todoDiv.appendChild(doneButton)

        // Delete Button

        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = "<i class='fa-solid fa-trash-can'></i>"
        deleteButton.classList.add("delete-button")
        todoDiv.appendChild(deleteButton)

        ulEl.appendChild(todoDiv)
        checkTasks()
        inputField.value = ""

    }

}

function deleteCheck(event) {

    const item = event.target

    // Delete Todo

    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement
        item.style.color = "#d03939"

        // Removing the todo with transition

        item.innerHTML = "<i class='fa-solid fa-trash-can fa-bounce'></i>"
        todo.style.transform = "translateX(100%)"
        todo.style.opacity = "0%"
        todo.style.transitionDelay = "1000ms"


        setTimeout(() => {
            todo.remove()
            removeLocalTodos(todo)
            checkTasks()
        }, 1200)
    } 

    // Check Mark

    if (item.classList[0] === "done-button") {
        const todo = item.parentElement
        item.innerHTML = "<i class='fa-regular fa-square-check'></i>"
        item.style.color = "#5d9959"
        todo.classList.toggle("completed")

        // To increment the number of completed tasks

        if (todo.classList[1] !== "completed") {

        }
        else {
            
            // Store value in local storage and to display the number of completed tasks from local storage

            storeCompletedTasksInLocalStorage()
        }

        // Removing the todo with transition

        item.innerHTML = "<i class='fa-regular fa-square-check fa-bounce'></i>"
        todo.style.transform = "translateX(-100%)"
        todo.style.opacity = "0%"

        setTimeout(() => {
            todo.remove()
            removeLocalTodos(todo)
            checkTasks()
        }, 1200)
    }
}

function saveLocalTodos(todo) {

    // Check : Hey do `i already have something in there?

    let todos

    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))

}

function getTodos() {

    checkTasks()

    // Check : Hey do `i already have something in there?

    let todos

    if (localStorage.getItem("todos") === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }


    todos.forEach(function(todo) {
        // Div

        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        // Li

        const newTodo = document.createElement("li")
        newTodo.classList.add("todo-item")
        newTodo.innerText = todo
        todoDiv.appendChild(newTodo)

        // Done Button

        const doneButton = document.createElement("button")
        doneButton.innerHTML = "<i class='fa-regular fa-square'></i>"
        doneButton.classList.add("done-button")
        todoDiv.appendChild(doneButton)

        // Delete Button

        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = "<i class='fa-solid fa-trash-can'></i>"
        deleteButton.classList.add("delete-button")
        todoDiv.appendChild(deleteButton)

        ulEl.appendChild(todoDiv)
    })
}


function removeLocalTodos(todo) {
     // Check : Hey do `i already have something in there?

     let todos

     if (localStorage.getItem("todos") === null) {
         todos = []
     }
     else {
         todos = JSON.parse(localStorage.getItem("todos"))
     }

     // To get the index of the todo to be deleted

     const todoIndex = todo.children[0].innerText
     todos.splice(todos.indexOf(todoIndex), 1)

     localStorage.setItem("todos", JSON.stringify(todos))
}

function storeCompletedTasksInLocalStorage() {

    let number = parseInt(completedTasks.innerText)
    number += 1
    let numberString = number.toString()
    completedTasks.innerText = numberString

    
    let completedTasksArray

    if (localStorage.getItem("completedTasks") === null) {
        completedTasksArray = []
    }
    else {
        completedTasksArray = JSON.parse(localStorage.getItem("completedTasks"))
    }

    completedTasksArray = []
    completedTasksArray.push(numberString)

    localStorage.setItem("completedTasks", JSON.stringify(completedTasksArray))

}

function checkNumberOfCompletedTasks() {
    const something = JSON.parse(localStorage.getItem("completedTasks"))

    if (something === null) {
        localStorage.setItem("completedTasks", JSON.stringify(["0"]))
    }

    else {
        const countArray = JSON.parse(localStorage.getItem("completedTasks"))
        const count = countArray[0]
        completedTasks.innerText = count.toString()
    }
}
