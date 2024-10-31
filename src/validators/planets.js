const { body, check } = require("express-validator");
const validateResults = require("../utils/handleValidator.js");
const validatorGetPlanetSwapi = [
  check("id")
    .exists()
    .notEmpty()
    .withMessage("parameto id no valido")
    .isNumeric()
    .withMessage("el parametro no es un numero"),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
module.exports = {
  validatorGetPlanetSwapi,
};
