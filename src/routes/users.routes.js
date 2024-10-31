const express = require("express");
const { registerUser,loginUser } = require("../controllers/users.controller");
const {validatorRegister,validatorLogin } = require("../validators/users");
const {validateEmail} = require('../middlewares');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Rutas relacionadas con los usuarios
 */
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registro de usuario
 *     description: Registra un nuevo usuario con email, nombre y contraseña.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: Adnner Esperilla
 *               password:
 *                 type: string
 *                 example: mysecurepassword
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *       400:
 *         description: Error de validación.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuario
 *     description: Inicia sesión con email y contraseña.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mysecurepassword
 *     responses:
 *       200:
 *         description: Login exitoso.
 *       401:
 *         description: Credenciales inválidas.
 */

router.post("/login", validatorLogin, loginUser);

router.post("/register", validatorRegister,validateEmail, registerUser);

module.exports = router;