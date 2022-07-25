// To make sure that the user has already visted that page

alreadyVisitedOrNot()


// Selectors

const authorName = document.querySelector("#name-of-the-author")
const doneButton = document.querySelector("#done-button")

// Event Listeners

doneButton.addEventListener("click", () => {storeName(authorName.value)})
localStorage.setItem("visited", "true")

// Functions

function alreadyVisitedOrNot() {
    if (localStorage.getItem("visited")) {
        window.location.href = "todos.html"
    }
}

function storeName(nameOfAuthor) {

    let namesOfAuthors

    // Check if names of authors already present or not in local storage

    if (localStorage.getItem('namesOfAuthors') === null) {
        namesOfAuthors = []
    }
    else {
        namesOfAuthors = JSON.parse(localStorage.getItem("namesOfAuthors"))

        // Check if there is only 1 name in the local storage

        if (namesOfAuthors.length > 1) {
            let currentName = namesOfAuthors[-1] // Last element in the array (most recent name)
            namesOfAuthors = []
            namesOfAuthors.push(currentName)
        }

    }

    // Check if done button pressed without any input

    if (authorName.value === "") {

    }
    else {
        namesOfAuthors.push(nameOfAuthor)
        localStorage.setItem("namesOfAuthors", JSON.stringify(namesOfAuthors))
    }
}