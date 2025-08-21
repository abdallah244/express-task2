// controllers/bookController.js

// Array مؤقتة تمثل قاعدة بيانات
let books = [
  { id: 1, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// ✅ GET - كل الكتب
const getAllBooks = (req, res) => {
  try {
    res.status(200).json({ success: true, data: books });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ GET - كتاب بالـ ID
const getBookById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ POST - إضافة كتاب
const createBook = (req, res) => {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const newBook = {
      id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
      title,
      author
    };

    books.push(newBook);
    res.status(201).json({ success: true, data: newBook });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ PUT - تعديل كتاب
const updateBook = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find(b => b.id === id);

    if (!book) return res.status(404).json({ error: "Book not found" });

    if (title) book.title = title;
    if (author) book.author = author;

    res.status(200).json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ DELETE - مسح كتاب
const deleteBook = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) return res.status(404).json({ error: "Book not found" });

    const deletedBook = books.splice(index, 1);
    res.status(200).json({ success: true, data: deletedBook[0] });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
