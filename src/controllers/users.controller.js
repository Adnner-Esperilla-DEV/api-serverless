const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { userSchema, loginSchema } = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { compare, encrypt } = require("../utils/handlePassword");
const jwt = require("jsonwebtoken");

const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

const registerUser = async (req, res) => {
  const { error, value } = userSchema.validate(req.body);
  value.password = await encrypt(value.password);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const userId = uuidv4();
  const params = {
    TableName: USERS_TABLE,
    Item: { userId, ...value },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.status(200).json({
      success: true,
      message: `Se creo usuario: ${value.email} con exito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const params = {
      TableName: USERS_TABLE,
    };
    const command = new ScanCommand(params);
    const result = await docClient.send(command);
    const user = result.Items.find((user) => user.email === value.email);
    if (!user) {
      return res.status(404).json({ message: "El email es invalido" });
    }
    const passwordMatch = await compare(value.password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Contraseña inválida, intente nuevamente" });
    }
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({
      success: true,
      token,
      message: `Bienvenido: ${user.name} `,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  registerUser,
  loginUser,
};
