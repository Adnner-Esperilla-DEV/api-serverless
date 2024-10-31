const express = require("express");
const { getPlanetsSwapi,getPlanetsSwapibyId } = require("../controllers/planets.controller");
const {validatorGetPlanetSwapi } = require("../validators/planets");
const { authenticateToken } = require("../middlewares");
const router = express.Router();
/**
 * @swagger
 * /planets/swapi:
 *   get:
 *     tags:
 *       - Planetas
 *     summary: Obtiene la lista de planetas de SWAPI
 *     operationId: getPlanets
 *     security:
 *       - bearerAuth: []  # Necesitas un token de autorización
 *     responses:
 *       '200':
 *         description: Lista de planetas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 61
 *                 next:
 *                   type: string
 *                   example: "https://swapi.py4e.com/api/planets/?page=2"
 *                 previous:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Tatooine"
 *                       rotation_period:
 *                         type: string
 *                         example: "23"
 *                       orbital_period:
 *                         type: string
 *                         example: "304"
 *                       diameter:
 *                         type: string
 *                         example: "10465"
 *                       climate:
 *                         type: string
 *                         example: "arid"
 *                       gravity:
 *                         type: string
 *                         example: "1 standard"
 *                       terrain:
 *                         type: string
 *                         example: "desert"
 *                       surface_water:
 *                         type: string
 *                         example: "1"
 *                       population:
 *                         type: string
 *                         example: "200000"
 *                       residents:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "https://swapi.py4e.com/api/people/1/"
 *                       films:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "https://swapi.py4e.com/api/films/1/"
 *                       created:
 *                         type: string
 *                         format: date-time
 *                         example: "2014-12-09T13:50:49.641000Z"
 *                       edited:
 *                         type: string
 *                         format: date-time
 *                         example: "2014-12-20T20:58:18.411000Z"
 *                       url:
 *                         type: string
 *                         example: "https://swapi.py4e.com/api/planets/1/"
 *       '401':
 *         description: Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token inválido o no proporcionado"
 *       '500':
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener los planetas"
 */
router.get("/swapi",authenticateToken, getPlanetsSwapi);
/**
 * @swagger
 * /planets/swapi/{id}:
 *   get:
 *     tags:
 *       - Planetas
 *     summary: Obtiene un planeta específico por ID de SWAPI
 *     operationId: getPlanetById
 *     security:
 *       - bearerAuth: []  # Necesitas un token de autorización
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del planeta que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Planeta obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Tatooine"
 *                 rotation_period:
 *                   type: string
 *                   example: "23"
 *                 orbital_period:
 *                   type: string
 *                   example: "304"
 *                 diameter:
 *                   type: string
 *                   example: "10465"
 *                 climate:
 *                   type: string
 *                   example: "arid"
 *                 gravity:
 *                   type: string
 *                   example: "1 standard"
 *                 terrain:
 *                   type: string
 *                   example: "desert"
 *                 surface_water:
 *                   type: string
 *                   example: "1"
 *                 population:
 *                   type: string
 *                   example: "200000"
 *                 residents:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://swapi.py4e.com/api/people/1/"
 *                 films:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "https://swapi.py4e.com/api/films/1/"
 *                 created:
 *                   type: string
 *                   format: date-time
 *                   example: "2014-12-09T13:50:49.641000Z"
 *                 edited:
 *                   type: string
 *                   format: date-time
 *                   example: "2014-12-20T20:58:18.411000Z"
 *                 url:
 *                   type: string
 *                   example: "https://swapi.py4e.com/api/planets/1/"
 *       '404':
 *         description: Planeta no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Planeta no encontrado"
 *       '401':
 *         description: Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token inválido o no proporcionado"
 *       '500':
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener el planeta"
 */
router.get("/swapi/:id",authenticateToken, validatorGetPlanetSwapi, getPlanetsSwapibyId);
module.exports = router;