const textFrame = document.querySelector('#textField');
const add = document.querySelector('#add');
const outcome = document.querySelector('#outcome');
let notesList = document.querySelector('#notesList')

add.addEventListener("click", function () {
    if (!textFrame.value.trim()) {
        outcome.textContent = "You can't add empty note";
        setTimeout(() => {
            outcome.textContent = "";
        }, 4000);
    } else {
        let noteName = window.prompt('Nazwij notatkę');
        notesList.innerHTML += `<div><h2 onclick="toggleNoteContent(this)">${noteName} <button class="delete">Delete</button></h2><p class='hidden'>${textFrame.value}</p></div>`;
        textFrame.value = '';
    }
});

function toggleNoteContent(element) {
    const div = element.parentNode;
    const content = div.querySelector('p');
    content.classList.toggle('hidden');
}

notesList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        const noteDelete = event.target.closest('div');
        if (confirmDeleteNote(noteDelete)) {
            noteDelete.remove();
        }
    }
});

function confirmDeleteNote(noteElement) {
    const noteName = noteElement.querySelector('h2').textContent.trim().replace(' Delete', '');
    if (confirm(`Do you want to delete note "${noteName}?"`)) {
        return true;
    } else {
        return false;
    }
}