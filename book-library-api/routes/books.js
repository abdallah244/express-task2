// routes/books.js
const express = require("express");
const router = express.Router();

// استدعاء الفانكشنات من الكنترولر
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

// ✅ Routes
router.get("/", getAllBooks);       // GET → كل الكتب
router.get("/:id", getBookById);    // GET → كتاب محدد بالـ ID
router.post("/", createBook);       // POST → إضافة كتاب جديد
router.put("/:id", updateBook);     // PUT → تعديل كتاب
router.delete("/:id", deleteBook);  // DELETE → حذف كتاب

module.exports = router;
