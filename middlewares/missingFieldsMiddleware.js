const createError = require('http-errors');

const missingFieldsError = (fields) => `Missing fields in request: ${fields}`;

module.exports = (requiredFields) =>
  (req, res, next) => {
    const missingFields = requiredFields.filter((field) =>
      !Object.keys(req.body).find((attribute) =>
        attribute === field &&
        (req.body[attribute] !== null || req.body[attribute] !== undefined)));

    if (missingFields.length) {
      next(createError(400, missingFieldsError(missingFields)));
    } else {
      next();
    }
  };
