const { validateEmail,docClient } = require('../middlewares/validateEmail'); 

jest.mock('@aws-sdk/lib-dynamodb', () => {
    const originalModule = jest.requireActual('@aws-sdk/lib-dynamodb');
    return {
      ...originalModule,
      DynamoDBDocumentClient: {
        from: jest.fn().mockReturnValue({
          send: jest.fn(), 
        }),
      },
      ScanCommand: jest.fn(),
    };
  });

describe('validateEmail Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next() if email is not registered', async () => {
    req.body.email = 'test@example.com';
    
    const sendMock = docClient.send.mockResolvedValueOnce({
      Items: [
        { email: 'another@example.com' }, 
      ],
    });

    await validateEmail(req, res, next);
    expect(sendMock).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if email is already registered', async () => {
    req.body.email = 'test@example.com';

    const sendMock = docClient.send.mockResolvedValueOnce({
      Items: [
        { email: 'test@example.com' }, 
      ],
    });

    await validateEmail(req, res, next);
    expect(sendMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El email ya está registrado' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 if there is an error in the database call', async () => {
    req.body.email = 'test@example.com';

    const sendMock = docClient.send.mockRejectedValueOnce(new Error('Database error'));

    await validateEmail(req, res, next);
    expect(sendMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al validar el email' });
    expect(next).not.toHaveBeenCalled();
  });
});
