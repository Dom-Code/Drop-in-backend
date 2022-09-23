const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleAuth = async (req, res) => {
  const { email, pw } = req.body;

  if (!email || !pw) {
    return res.status(400).json({ auth: false, message: 'Email and password are required.' });
  }

  // Here we require both an email and a pw to log in.

  try {
    const foundUser = await res.locals.store.getEmail(email);
    if (foundUser) {
      const hashedPw = foundUser[0].pw.trim();
      const userId = foundUser[0].id;
      const compare = await bcrypt.compare(pw, hashedPw);

      if (compare) {
        const accessToken = jwt.sign(
          { email: foundUser.email },
          `${process.env.ACCESS_TOKEN_SECRET}`,
          { expiresIn: '5m' },
        );
        const refreshToken = jwt.sign(
          { email: foundUser.email },
          `${process.env.REFRESH_TOKEN_SECRET}`,
          { expiresIn: '45m' },
        );
        return res.status(200).json({
          auth: true, accessToken, refreshToken, userId,
        });
      }
    }
    return res.status(401).json({ auth: false, message: 'Incorrect email or password' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleAuth;
