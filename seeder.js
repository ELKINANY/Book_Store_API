const  Book = require("./models/books.model");
const books  = require("./DB_Data");
require("dotenv").config();
const connectDB = require("./config/connectToDB");

connectDB();

const insertBooks = async () => {
try {
  await Book.insertMany(books);
  console.log("Books inserted successfully");
  process.exit(0);
} catch (error) {
  console.error("Error inserting books:", error);
  process.exit(1);
}}

const deleteBooks = async () => {
  try {
  await Book.deleteMany()
  console.log("Books deleted successfully");
  process.exit(0);
  } catch (error) {
  console.error("Error deleting books:", error);
  process.exit(1);
  }
}

if (process.argv[2] === "i") {
  insertBooks();
}else if (process.argv[2] === "d") {
  deleteBooks();
}