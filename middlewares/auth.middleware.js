// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const apiError = require('../utils/apiError');
const User = require('../models/user.model');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new apiError('Not authorized, no token', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new apiError('Not authorized, token failed', 401));
    }
});

exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return next(new apiError("You are not logged in", 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });