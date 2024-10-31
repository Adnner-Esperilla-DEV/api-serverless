const Joi = require('joi');

const planetSchema = Joi.object({
  nombre: Joi.string().required(),
  periodo_rotacion: Joi.string().required(),
  periodo_orbital: Joi.string().required(),
  diametro: Joi.string().required(),
  clima: Joi.string().required(),
  gravedad: Joi.string().required(),
  terreno: Joi.string().required(),
  agua_superficial: Joi.string().required(),
  poblacion: Joi.string().required(),
  residentes: Joi.array().items(Joi.string()).required(),
  peliculas: Joi.array().items(Joi.string()).required(),
  creado: Joi.date().iso().required(),
  editado: Joi.date().iso().required(),
  url: Joi.string().uri().required(),
});

module.exports = {
  planetSchema,
};