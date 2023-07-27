// controllers/register.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "rohit123"

///register ke liye



//login ke liye
async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: 'Username and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '60m' });
        res.status(200).send({ token });
      } else {
        res.status(400).send({ message: 'Invalid password' });
      }
    } else {
      res.status(400).send({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}
//token check krne ke liye

async function check_authentication (req, res){
    const token = req.body.token;
    if (!token) {
        res.status(400).send({ message: 'provide token ' });
        return;
      }
  
    jwt.verify(token,JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          valid: false
        });
      } else {
        res.json({
          valid: true
        });
      }
    });
  }


module.exports = {loginUser,check_authentication};

