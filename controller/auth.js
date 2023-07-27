const jwt = require('jsonwebtoken');

function verifyToken(req, res, next, callback) {
  const token = req.body.token;
  if (!token) {
    return res.status(401).send({ message: 'not token found Unauthorized' });
  }
  jwt.verify(token,"rohit123", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = decoded;
    callback(req, res, next);
  });
}


module.exports = {
  verifyToken
};
