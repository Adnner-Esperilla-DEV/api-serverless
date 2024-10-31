const { validationResult } = require("express-validator");
const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();

    return next(); 
  } catch (err) {
    const errors = err.array();

    const errorMessages = errors.map((error) => error.msg);
    return res.status(403).json({
      success: false,
      errors: errorMessages,
    });
  }
};
module.exports = validateResults;
