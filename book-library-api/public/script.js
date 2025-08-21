const API_URL = "/api/books";
const form = document.getElementById("bookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const titleError = document.getElementById("titleError");
const authorError = document.getElementById("authorError");
const bookList = document.getElementById("bookList");
const loader = document.getElementById("loader");

// Loader
window.addEventListener("load", () => {
  setTimeout(() => loader.style.display = "none", 1000);
});

// Page switch
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page + "Page").classList.add("active");
}

// Validation
function validateForm() {
  let valid = true;
  if (!titleInput.value.trim()) {
    titleError.textContent = "Title is required";
    valid = false;
  } else { titleError.textContent = ""; }

  if (!authorInput.value.trim()) {
    authorError.textContent = "Author is required";
    valid = false;
  } else { authorError.textContent = ""; }

  return valid;
}

// Load Books
async function loadBooks() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderBooks(data.data);
}

// Render Books
function renderBooks(books) {
  bookList.innerHTML = "";
  books.forEach(book => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${book.title}</strong> — ${book.author}</span>
      <button onclick="deleteBook(${book.id}, this)">❌</button>
    `;
    bookList.appendChild(li);
  });
}

// Submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  await fetch(API_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      title: titleInput.value,
      author: authorInput.value
    })
  });

  form.reset();
  loadBooks();
});

// Delete
async function deleteBook(id, btn) {
  const li = btn.closest("li");
  li.classList.add("removing");
  setTimeout(async () => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadBooks();
  }, 400);
}

// API Explorer
async function loadAPIData() {
  const res = await fetch(API_URL);
  const data = await res.json();
  document.getElementById("apiData").textContent = JSON.stringify(data, null, 2);
}

// Default load
loadBooks();
