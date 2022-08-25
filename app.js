const express = require('express');
const cookieParser = require('cookie-parser');

const app = new express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');

const PgPersistence = require('./public/pg-persistence');
// const config = require('./public/lib/config');

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

app.use('/api', router);

module.exports = app;
