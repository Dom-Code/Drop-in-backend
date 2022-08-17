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

    if (!await res.locals.store.getEmail(email)) {
      return res.status(401).json({ auth: false, message: 'User not found' });
    }

    // if email is not stored in database, return 401 error.
    console.log(pw)
    const storedPw = foundUser[0].pw;
    const hashedPw = await bcrypt.hash(pw, 10);

    console.log("hashed entered pw" + hashedPw)
    console.log("stored pw" + storedPw)


    const compare = await bcrypt.compare(pw, storedPw)
    console.log(compare)
    console.log(await bcrypt.compare(pw, storedPw))
    if (storedPw && compare) {
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
      return res.status(200).json({ status: 'Logged in', accessToken, refreshToken });
    }

    return res.status(401).json({ auth: false, message: 'Incorrect email or password' });

    // bcrypt.compare(pw, storedPw, (err) => {
    //   if (err) {
    //     return res.status(401).json({ auth: false, message: 'Incorrect email or password' });
    //   }
    //     const accessToken = jwt.sign(
    //       { email: foundUser.email },
    //       `${process.env.ACCESS_TOKEN_SECRET}`,
    //       { expiresIn: '5m' },
    //     );
    //     const refreshToken = jwt.sign(
    //       { email: foundUser.email },
    //       `${process.env.REFRESH_TOKEN_SECRET}`,
    //       { expiresIn: '45m' },
    //     );
    //     return res.status(200).json({ status: 'Logged in', accessToken, refreshToken });
      
    //   // The access token expires in 3 min. At expiration the frontend will send the refresh
    //   // token and recieve a new access token.
    // });

    // We use bcrypt to compare the entered pw with the one saved in the database.

    // if (pwMatch) {

    // }
  } catch (err) {
    console.log(err);
  }
};

module.exports = handleAuth;
