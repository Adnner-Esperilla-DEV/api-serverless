const { body, check } = require("express-validator");
const validateResults = require("../utils/handleValidator.js");
const validatorRegister = [
    body("name")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("El campo name no puede estar vacío")
      .isLength({ min: 2, max: 99 })
      .withMessage("El campo name debe contener mas de dos caracteres"),
    body("email")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("El campo email debe ser un email")
      .isEmail()
      .withMessage("El campo email debe ser un email"),
    body("password")
    .exists()
    .notEmpty()
    .withMessage("El campo password no puede estar vacío")
    .isLength({ min: 5, max: 10 })
    .withMessage("El campo password debe contener 5 a 10 caracteres"),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
    
  ];
  const validatorLogin = [
    body("email")
      .trim()
      .exists()
      .notEmpty()
      .withMessage("El campo email debe ser un email")
      .isEmail()
      .withMessage("El campo email debe ser un email"),
    body("password")
    .exists()
    .notEmpty()
    .withMessage("El campo password no puede estar vacío")
    .isLength({ min: 5, max: 10 })
    .withMessage("El campo password debe contener 5 a 10 caracteres"),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
    
  ];
  module.exports = {
    validatorRegister,
    validatorLogin
  }