const express = require("express");
const { registerUser,loginUser,getProfile } = require("../controllers/users.controller");
const {validatorRegister,validatorLogin } = require("../validators/users");
const {validateEmail,authenticateToken} = require('../middlewares');
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
/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     description: Retorna el nombre y correo del usuario autenticado usando el userId contenido en el token.
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "adnner"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *       401:
 *         description: No autorizado. Token inválido o faltante.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/login", validatorLogin, loginUser);

router.post("/register", validatorRegister,validateEmail, registerUser);
router.get('/profile', authenticateToken, getProfile);
module.exports = router;