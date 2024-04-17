const textFrame = document.querySelector('#textField');
const addButton = document.querySelector('#add');
const outcome = document.querySelector('#outcome');
let notesList = document.querySelector('#notesList');

// Adding event listener for the "click" event on the "add" button
addButton.addEventListener("click", function () {  // Checking if the text field is not empty after trimming whitespace
    if (!textFrame.value.trim()) {  // If the text field is empty, displaying a warning message
        outcome.textContent = "You can't add empty note";
        setTimeout(() => {  // Hiding the message after 4 seconds
            outcome.textContent = "";
        }, 4000);
    } else {  // If the text field is not empty, asking user for note name
        let noteName = window.prompt('Name note.');
        notesList.innerHTML += `<div><h2 onclick="toggleNoteContent(this)">${noteName} <button class="deleteButton">Delete</button></h2><p class='hidden'>${textFrame.value}</p></div>`; // Adding a new note to the list of notes and clearing text field. 
        textFrame.value = '';
    }
});

// Function handling toggling the visibility of note content when clicking on its title. Refer to h2 onclick
function toggleNoteContent(element) {
    const div = element.parentNode;
    const content = div.querySelector('p');
    content.classList.toggle('hidden');
}

notesList.addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteButton')) {
        const noteDelete = event.target.closest('div');
        if (confirmDeleteNote(noteDelete)) {  //If confirmDeleteNote return true remove note
            noteDelete.remove();
        }
    }
});

// Function to confirm the user's intention to delete a note
function confirmDeleteNote(noteElement) {
    const noteName = noteElement.querySelector('h2').textContent.trim().replace(' Delete', ''); // Getting the name of the note to be deleted. Replace text content of button to write only name in the question
    if (confirm(`Do you want to delete note "${noteName}?"`)) {
        return true; // Returning true if the user confirms the deletion
    } else {
        return false;
    }
}