const jwt = require("jsonwebtoken");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient();

const docClient = DynamoDBDocumentClient.from(client);
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ message: "No autorizado" });
  try {
    console.log('entra al auth');
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    console.log(userId);
    const USERS_TABLE = process.env.USERS_TABLE;
    const params = {
      TableName: USERS_TABLE,
      Key: {
        userId: userId,
      },
    };
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    console.log(Item)
    if (!Item) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe DB",
      });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = { authenticateToken };
