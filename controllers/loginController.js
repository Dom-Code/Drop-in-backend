const bcrypt = require('bcryptjs');
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
      return res.status(401).json({ auth: false, message: 'User not found' });
    }

    const storedPw = foundUser[0].pw;

    const compare = bcrypt.compareSync(pw, storedPw);
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
      return res.status(200).json({ status: 'Logged in', accessToken, refreshToken });
    }
    return res.status(401).json({ auth: false, message: 'Incorrect email or password' });

    // bcrypt.compare(pw, storedPw, (err, response) => {
    //   console.log(err);
    //   console.log(response);
    //   if (!err) {
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
    //   }

    //   return res.status(401).json({ auth: false, message: 'Incorrect email or password' });
    // });
    // if email is not stored in database, return 401 error.
    // console.log(pw);
    // const storedPw = foundUser[0].pw;
    // const hashedPw = await bcrypt.hash(pw, 10);

    // console.log(hashedPw);
    // console.log(storedPw);

    // const compare = await bcrypt.compare(pw, storedPw);
    // console.log(compare);
    // console.log(await bcrypt.compare(pw, storedPw));
    // if (storedPw && compare) {
    //   const accessToken = jwt.sign(
    //     { email: foundUser.email },
    //     `${process.env.ACCESS_TOKEN_SECRET}`,
    //     { expiresIn: '5m' },
    //   );
    //   const refreshToken = jwt.sign(
    //     { email: foundUser.email },
    //     `${process.env.REFRESH_TOKEN_SECRET}`,
    //     { expiresIn: '45m' },
    //   );
    //   return res.status(200).json({ status: 'Logged in', accessToken, refreshToken });
    // }

    // return res.status(401).json({ auth: false, message: 'Incorrect email or password' });

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
