const {
  DynamoDBClient,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  ScanCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const USERS_TABLE = process.env.USERS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);
const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);

  try {
    const params = {
      TableName: USERS_TABLE,
    };
    const command = new ScanCommand(params);
    const result = await docClient.send(command);
    console.log(result.Items);
    const exists = result.Items.some(user => user.email === email);
    console.log(exists);
    if (exists) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    next();
  } catch (err) {
    console.error('Error al validar el email:', err);
    res.status(500).json({ error: 'Error al validar el email' });
  }
};
module.exports = {
    validateEmail,docClient ,
  };