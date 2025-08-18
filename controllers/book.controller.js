const asyncHandler = require('express-async-handler');
const Book = require('../models/books.model');

/** 
  * @desc    Create a new Book
  * @route   POST /api/Books
  * @method  POST
  * @access  private (admin only)
*/
const createBook = asyncHandler(async (req, res) => {
  try {
    const project = await Book.create(req.body);
  res.status(201).json({
    success: true,
    message:"Book created successfully",
    data: project
  });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
  * @desc    get all Books
  * @route   GET /api/Books
  * @method  GET
  * @access  public
*/
const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.page) || 1;
    const skip = pageNumber * 2 - 2;
    const Books = await Book.find().skip(skip).limit(2);
    res.status(200).json({
      success: true,
      data: Books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
})

/**
  * @desc    get single Book
  * @route   GET /api/Books/:id
  * @method  GET
  * @access  public
*/
const getSingleBook = asyncHandler(async (req, res) => {
  try {
    const foundBook = await Book.findById(req.params.id);
    if (!foundBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.status(200).json({
      success: true,
      data: foundBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
  * @desc    Update a Book
  * @route   PUT /api/Books/:id
  * @method  PUT
  * @access  private (admin only)
*/
const updateBook = asyncHandler(async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
  * @desc    Delete a Book
  * @route   DELETE /api/Books/:id
  * @method  DELETE
  * @access  private (admin only)
  */
const deleteBook = asyncHandler(async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
}