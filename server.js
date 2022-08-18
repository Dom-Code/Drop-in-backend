const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PgPersistence = require('./db/pg-persistence');
const verifyJWT = require('./middleware/verifyJWT');
const verifyBlackList = require('./middleware/verifyBlackList');
// const config = require('./public/lib/config');

const port = process.env.PORT || 5000;
const host = process.env.HOST;
const app = express();

const whiteList = ['http://localhost:3000', 'https://dom-code.github.io'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  // credentials: true,
};

app.use((req, res, next) => {
  res.locals.store = new PgPersistence(req.session);
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(cors({ exposedHeaders: 'Authorization' }));

app.get('/Drop-in-app-react/user', (req, res) => {
  res.redirect('/Drop-in-app-react');
});

app.use('/api/register', require('./routes/register'));
app.use('/api/partial-providers', require('./routes/partialProviders'));

app.use('/api/logout', require('./routes/logout'));
app.use('/api/auth', require('./routes/login'));

app.use('/api/full-providers', verifyJWT, require('./routes/fullProviders'));
app.use('/api/refresh', verifyBlackList, require('./routes/refresh'));

app.listen(port, host, () => console.log(`Server started on port ${port}`));

module.exports = app;
