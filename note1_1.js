const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');
const searchInput = document.getElementById('searchInput');
const addNoteBtn = document.getElementById('addNoteBtn');

addNoteBtn.addEventListener('click', () => {
  const note = noteInput.value.trim();
  if (note) {
    addNoteToUI(note);
    saveNotes();
    noteInput.value = '';
  }
});

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  Array.from(notesList.children).forEach((note) => {
    note.style.display = note.textContent.toLowerCase().includes(searchValue) ? '' : 'none';
  });
});

function addNoteToUI(note) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `${note} <button class="deleteBtn">X</button>`;
  notesList.appendChild(listItem);
}

notesList.addEventListener('click', (e) => {
  if (e.target.classList.contains('deleteBtn')) {
    e.target.parentElement.remove();
    saveNotes();
  }
});

function saveNotes() {
  const notes = Array.from(notesList.children).map((note) => note.textContent.replace('X', '').trim());
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach((note) => addNoteToUI(note));
}

loadNotes();
