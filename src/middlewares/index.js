const validateEmail = require('./validateEmail');
const auth = require('./auth');
module.exports= {
    ...validateEmail,
    ...auth,
}