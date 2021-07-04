const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    }
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression())
app.use(
  express.static(path.join(__dirname, 'public'), { extensions: ['html'] })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

const listener = app.listen(8080, function () {
  console.log('Listening on port ' + listener.address().port);
});
