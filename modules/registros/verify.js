const jwt = require('jsonwebtoken');

const secretKey = 'secretkey';

const authenticateToken = function(req, res, next) {
  jwt.verify(req.headers.token, secretKey, function(err, decoded) {
    if (err || !decoded) {
      return res.json({ code: 401, data: err? err :'user not loggued' });
    }
    req.decoded = decoded;
    next();
  });
};


module.exports.authenticateToken = authenticateToken;
module.exports.secretKey = secretKey;