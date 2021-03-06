import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // splits 'Bear "theToken"'
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // fetch user from the db, and append into the req
      // (the updated req will be passed into the next route)
      // Model.findById() returns a Query
      // select() can specify including or excluding a specified field. by '-' or '+'
      // here is return everything except password
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorised, please try to login again.');
      }

      next();
    } catch (error) {
      // fails - the token failed
      res.status(401);
      throw new Error(
        error.message ? error.message : 'Not authorised, token failed'
      );
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorised, no token');
  }
});

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // only move into the next step when it is admin
    next();
  } else {
    // not authorised
    res.status(401);
    throw new Error('Not authorised as an admin');
  }
};
