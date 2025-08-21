// app.js
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Serve static frontend (public folder)
app.use(express.static(path.join(__dirname, "public")));

// API Routes
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

// ✅ أي Route مش معروف → يرجع صفحة الواجهة
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
