// Get references to the input box and the list container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a new task to the list
function addTask() {
    // Check if the input box is empty
    if(inputBox.value === "") {
        alert("You must write something!!"); // Alert the user if no input
    } else {
        // Create a new list item (li) element
        let li = document.createElement("li");
        li.innerHTML = inputBox.value; // Set the text of the list item to the input value
        listContainer.appendChild(li); // Add the list item to the list container

        // Create a span element for the delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Set the text of the span to a multiplication sign (×)
        li.appendChild(span); // Add the span to the list item
    }
    inputBox.value = ""; // Clear the input box
    saveData(); // Save the updated list to local storage
}

// Add an event listener to the input box to detect when the Enter key is pressed
inputBox.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        addTask(); // Call the addTask function when Enter is pressed
    }
});

// Add an event listener to the list container to handle clicks on list items and delete buttons
listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggle the 'checked' class on the list item
        saveData(); // Save the updated list to local storage
    } else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); // Remove the list item if the delete button is clicked
        saveData(); // Save the updated list to local storage
    }
}, false);

// Function to save the current list to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load and display the saved list from local storage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call the showTask function to display the saved list when the page loads
showTask();

// Register a service worker to enable offline functionality
if("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err));
    });
}
