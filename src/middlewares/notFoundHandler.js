import createError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  return next(createError(404, 'Route not found'));
};
