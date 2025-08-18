const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

/**
  * @desc    Create a new author
  * @route   POST /api/authors
  * @method  POST
  * @access  public
*/
const createAuthor = asyncHandler(async (req, res) => {
  try {
    const author = await User.create({ ...req.body, role: "author" }); // إجبار role = author
    res.status(201).json({
      success: true,
      message: "Author created successfully",
      data: author
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
  * @desc    get all authors
  * @route   GET /api/authors
  * @method  GET
  * @access  public
*/
const getAllAuthors = asyncHandler(async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.page) || 1;
    const skip = pageNumber * 2 - 2;
    const authors = await User.find({ role: "author" }).skip(skip).limit(2);
    res.status(200).json({
      success: true,
      data: authors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
  * @desc    get single author
  * @route   GET /api/authors/:id
  * @method  GET
  * @access  public
*/
const getSingleAuthor = asyncHandler(async (req, res) => {
  try {
    const author = await User.findOne({ _id: req.params.id, role: "author" });
    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found"
      });
    }
    res.status(200).json({
      success: true,
      data: author
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
  * @desc    Update an author
  * @route   PUT /api/authors/:id
  * @method  PUT
  * @access  private (admin and logged in author only)
*/
const updateAuthor = asyncHandler(async (req, res) => {
  try {
    // السماح لو الأدمن أو صاحب الحساب نفسه
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own profile"
      });
    }

    const author = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Author updated successfully",
      data: author
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
  * @desc    Delete an author
  * @route   DELETE /api/authors/:id
  * @method  DELETE
  * @access  private (admin and logged in author only)
  */
const deleteAuthor = asyncHandler(async (req, res) => {
  try {
    // السماح لو الأدمن أو صاحب الحساب نفسه
    if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own profile"
      });
    }

    const author = await User.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Author deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor
}